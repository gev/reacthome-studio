
export const peers = new Map();

export const send = (id, action) => {
  if (peers.has(id)) {
    peers.get(id).send(JSON.stringify(action));
  }
};
