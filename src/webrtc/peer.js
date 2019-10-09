
export const peers = new Map();
export const actions = new Map();
export const assets = new Map();

const sendMessage = (channel, message) => {
  if (channel.readyState === 'open') {
    channel.send(message);
  }
};

export const sendAction = (id, action) => {
  if (actions.has(id)) {
    sendMessage(actions.get(id), JSON.stringify(action));
  }
};


export const sendAsset = (id, chunk) => {
  if (assets.has(id)) {
    sendMessage(assets.get(id), chunk);
  }
};
