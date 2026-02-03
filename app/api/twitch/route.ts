import { NextResponse } from 'next/server';
import { getTimerState, setTimerState } from '@/lib/timerStore';

export async function GET() {
  return NextResponse.json(getTimerState());
}

export async function POST(request: Request) {
  const body = await request.json();
  const updatedState = setTimerState(body);
  return NextResponse.json(updatedState);
}