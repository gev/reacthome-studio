
export const options = {
  offerToReceiveAudio: false,
  offerToReceiveVideo: false
};

export const ICE = {
  iceServers: [
    {
      // urls: 'stun:gate.reacthome.net'
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      // urls: 'turns:gate.reacthome.net',
      // username: 'username',
      // credential: 'password'
      urls: 'turn:numb.viagenie.ca',
      username: 'webrtc@live.com',
      credential: 'muazkh'
    }
  ]
};
