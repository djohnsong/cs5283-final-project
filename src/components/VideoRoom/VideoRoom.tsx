import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import Video from "../Video/Video";

import "./videoRoom.css";

export default function VideoRoom() {
  const connection = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.pathname.split("/").pop();

  const [streams, setStreams] = useState(connection.videoStreams);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }
    connection.joinRoom(roomId);

    connection.on("streams-updated", () => {
      setStreams({ ...connection.videoStreams });
    });
  }, []);

  return (
    <div className="video-room">
      {Object.entries(streams).map((value) => {
        return (
          <div className="videos" key={value[0]}>
            <Video userId={value[0]} stream={value[1]} />
          </div>
        );
      })}
    </div>
  );
}
