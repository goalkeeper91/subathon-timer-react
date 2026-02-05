// hooks/useTwitchAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { getTwitchLoginUrl } from '@/lib/twitchConfig';

export function useTwitchAuth() {
  const [user, setUser] = useState<{id: string, name: string, avatar: string} | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = () => {
    window.location.href = getTwitchLoginUrl();
  };

  const logout = () => {
    localStorage.removeItem('twitch_access_token');

    document.cookie = "twitch_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";

    setIsAuthorized(false);
    setUser(null);
    
    window.location.href = '/';
  };

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const res = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || ''
        }
      });
      const data = await res.json();
      if (data.data && data.data[0]) {
        const userData = data.data[0];
        setUser({
          id: userData.id,  
          name: userData.display_name,
          avatar: userData.profile_image_url
        });
        setIsAuthorized(true);
        
        await fetch('/api/timer', {
          method: 'POST',
          body: JSON.stringify({ 
            accessToken: token,
            userId: userData.id,
            userName: userData.display_name,
            userAvatar: userData.profile_image_url
          })
        });
      }
    } catch (e) {
      console.error("Twitch Auth Error", e);
      logout();
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const tokenFromUrl = params.get('access_token');

    if (tokenFromUrl) {
      localStorage.setItem('twitch_access_token', tokenFromUrl);
      
      document.cookie = `twitch_access_token=${tokenFromUrl}; path=/; max-age=${60 * 60 * 24 * 60}; SameSite=Lax; Secure`;

      window.location.href = '/dashboard';
    } else {
      const savedToken = localStorage.getItem('twitch_access_token');
      if (savedToken) {
        fetchUserData(savedToken);
      }
    }
  }, [fetchUserData]);

  return { user, login, logout, isAuthorized };
}