import { NextResponse } from 'next/server';
import { getTimerState, setTimerState } from '@/lib/timerStore';

export async function GET() {
  const state = getTimerState();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Hier wird Start/Pause/Settings verarbeitet
    const updatedState = setTimerState(body);
    return NextResponse.json(updatedState);
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
}