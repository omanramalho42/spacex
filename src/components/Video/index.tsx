import React from 'react';

import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoScreenProps {
  url: string;
  showVideo: boolean;
}


const VideoScreen = ({ url, showVideo }: VideoScreenProps) => {
  console.log(url,'url video show');

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    borderRadius: '8px',
    zIndex: -30,
    playerVars: {
      autoplay: 1,
    },
  };
    if(showVideo) {
      return (
        <YouTube
          style={{ 
            all: 'unset',
            display: 'flex',
            width: '100%', 
            height: '100%',
            // zIndex: '-20',
            borderRadius: '8px',
            border: '4px solid #6A31BE',
            overflow: 'hidden',
            boxShadow: '0 0 12px 3px #6A31BE',
          }} 
          videoId={url} 
          opts={opts} 
          onReady={onPlayerReady} 
        />
      )
    }
  }

export default VideoScreen;
