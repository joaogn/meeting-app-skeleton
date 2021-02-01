import Peer from 'peerjs';

export const peer = new Peer(undefined, {
  port: 9000,
  host: 'localhost',
  path: '/',
});
