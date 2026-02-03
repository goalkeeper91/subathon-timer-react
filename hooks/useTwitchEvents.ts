// hooks/useTwitchEvents.ts
import { useEffect, useRef } from 'react';

export function useTwitchEvents(accessToken: string | null, userId: string | null) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!accessToken || !userId) return;

    // Twitch EventSub WebSocket URL
    const ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');
    socketRef.current = ws;

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      // 1. Session Welcome: Wir müssen die Subscription registrieren
      if (data.metadata.message_type === 'session_welcome') {
        const sessionId = data.payload.session.id;
        await registerSubscriptions(sessionId, accessToken, userId);
      }

      // 2. Notification: Ein echtes Event (Sub/Bits) kommt rein
      if (data.metadata.message_type === 'notification') {
        const payload = data.payload.event;
        const type = data.payload.subscription.type;

        // Wir schicken das Event an unser Backend
        await fetch('/api/timer/events', {
          method: 'POST',
          body: JSON.stringify({ type, payload })
        });
      }
    };

    return () => ws.close();
  }, [accessToken, userId]);
}

// Hilfsfunktion um Twitch zu sagen, was wir hören wollen
async function registerSubscriptions(sessionId: string, token: string, userId: string) {
  const types = ['channel.subscribe', 'channel.subscription.gift', 'channel.cheer'];
  
  for (const type of types) {
    await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        version: '1',
        condition: { broadcaster_user_id: userId },
        transport: { method: 'websocket', session_id: sessionId }
      })
    });
  }
}