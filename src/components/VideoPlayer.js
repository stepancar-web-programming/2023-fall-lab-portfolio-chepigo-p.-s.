import React from 'react';

const VideoPlayer = (props) => {
  return (
    <div>
      <video controls>
        <source src={props.src_link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
