import PusherClient from 'pusher-js'

export const pusherClient = new PusherClient(
  'getfitkey',
  {
    cluster: 'eu',
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    disableStats: false,
    enabledTransports: ['ws','wss'],
  }
)