import io from 'socket.io-client';

function getSocket(namespace = '', options = {}) {
  const socketUrl = new URL(namespace, process.env.REACT_APP_BACKEND_API);

  return io(socketUrl.toString(), {
    path: '/ws',
    ...options,
  });
}

export default getSocket;
