
export const options = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

export const ICE = {
  iceServers: [
    {
      urls: 'stun:gate.reacthome.net'
    },
    {
      urls: 'turns:gate.reacthome.net',
      username: 'username',
      credential: 'password'
    }
  ]
};
