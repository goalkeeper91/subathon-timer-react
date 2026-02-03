import { NextResponse } from 'next/server';
import { processEvent } from '@/lib/timerStore';

export async function POST(request: Request) {
  try {
    const { type, payload } = await request.json();

    if (type === 'channel.subscribe' || type === 'channel.subscription.gift') {
      processEvent('sub', 1, payload.user_name, payload.tier);
    } 
    else if (type === 'channel.cheer') {
      processEvent('bits', payload.bits, payload.user_name);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event Processing Error:", error);
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 });
  }
}