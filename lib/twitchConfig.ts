// lib/twitchConfig.ts
export const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || '';
export const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;

export const TWITCH_SCOPES = [
  'channel:read:subscriptions',
  'bits:read',
  'channel:read:redemptions',
  'moderator:read:followers'
].join(' ');

export const getTwitchLoginUrl = () => {
  return `https://id.twitch.tv/oauth2/authorize` +
    `?client_id=${TWITCH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token` +
    `&scope=${encodeURIComponent(TWITCH_SCOPES)}`;
};