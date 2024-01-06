import PusherClient from 'pusher-js'

export const pusherClient = new PusherClient(
  'getfitkey',
  {
    cluster: 'eu',
    wsHost: '159.89.207.232',
    wsPort: 6001,
    forceTLS: false,
    disableStats: false,
    enabledTransports: ['ws','wss'],
  }
)