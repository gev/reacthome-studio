
// import { spawn, exec } from 'child_process';
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
};

// const cam = 'rtsp://admin:koro4794@192.168.88.64:554/Streaming/Channels/101';
// const store = './tmp';
// const name = 'test';

class Daemons extends Component<Props> {
  componentDidMount() {
    // const video = document.querySelector('video');
    // const ffmpeg = spawn('ffmpeg', ['-i', cam, '-'], { detached: false });
    // // video.srcObject = ffmpeg.stdout;
    // const mediaSource = new MediaSource();
    // video.src = URL.createObjectURL(mediaSource);
    // const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    // ffmpeg.on('data', data => {
    //   sourceBuffer.appendBuffer(new Uint8Array(data));
    // });

    // exec(`ffplay -i ${cam} -window_title ${name}`);
    // spawn('ffmpeg', [
    //   '-y', '-i', cam, '-map', '0', '-c', 'copy', '-f', 'segment',
    //   '-segment_list', `${store}/${name}.m3u8`,
    //   '-segment_time', '0.5', '-segment_list_size', '3',
    //   '-segment_list_type', '2', '-segment_list_flags', 'live', `${store}/${name}-%d.ts`
    // ], { detached: false });
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect(props => props)(Daemons);
