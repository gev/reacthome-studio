
export const channels = new Map();

const sendMessage = (channel, message) => {
  if (channel.readyState === 'open') {
    channel.send(message);
  }
};

export const sendAction = (id, action) => {
  if (channels.has(id)) {
    sendMessage(channels.get(id).action, JSON.stringify(action));
  }
};

export const sendAsset = (id, asset) => {
  if (channels.has(id)) {
    sendMessage(channels.get(id).asset, asset);
  }
};
