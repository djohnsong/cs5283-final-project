import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../SocketContext";

import "./video.css";

const Video: React.FC<{ userId: string; stream: MediaStream }> = ({
  userId,
  stream,
}) => {
  const connection = useContext(SocketContext);

  const videoElement = useRef<HTMLVideoElement>(null);
  const [_, setUpdate] = useState(false);

  if (videoElement.current) {
    videoElement.current.srcObject = stream;

    if (userId === connection.userId) {
      videoElement.current.muted = true;
    }

    videoElement.current.onloadedmetadata = (e) => {
      videoElement.current?.play();
    };
  }

  useEffect(() => {
    setUpdate(true);
  }, []);

  return (
    <div className="video-container">
      {userId}
      <video className="video" ref={videoElement}></video>
    </div>
  );
};

export default Video;
