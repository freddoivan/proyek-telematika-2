import PusherClient from 'pusher-js'

export const pusherClient = new PusherClient(
  'getfitkey',
  {
    cluster: 'eu',
    wsHost: process.env.NEXT_PUBLIC_SOCKET_URL,
    wsPort: 6001,
    forceTLS: false,
    disableStats: false,
    enabledTransports: ['ws','wss'],
  }
)