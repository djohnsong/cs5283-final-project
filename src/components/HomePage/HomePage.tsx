import React, { useState } from "react";
import {
  IStackTokens,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./homePage.css";

const stackTokens: IStackTokens = {
  childrenGap: "s1",
};

export default function HomePage() {
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleStartCall = () => {
    const newRoomId = uuidv4();
    navigate(`room/${newRoomId}`);
  };

  const handleEnterCall = () => {
    navigate(`room/${roomId}`);
  };

  return (
    <Stack
      className="join-room-form"
      tokens={stackTokens}
      horizontalAlign="center"
    >
      <Stack.Item style={{ width: "100%", borderBottom: "1px solid black" }}>
        <Text style={{ width: "100%", fontWeight: "bold" }}>
          Start a new Call
        </Text>
      </Stack.Item>

      <Stack.Item align="center">
        <PrimaryButton
          label="Start Call"
          text="Start Call"
          onClick={handleStartCall}
        ></PrimaryButton>
      </Stack.Item>

      <Stack.Item
        style={{
          width: "100%",
          borderBottom: "1px solid black",
          marginTop: "10px",
        }}
      >
        <Text style={{ width: "100%", fontWeight: "bold" }}>
          Join Existing Call
        </Text>
      </Stack.Item>

      <Stack.Item align="center">
        <TextField
          label="Room ID"
          value={roomId}
          onChange={(
            _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            value?: string
          ) => {
            if (value !== undefined) setRoomId(value);
          }}
        />
      </Stack.Item>

      <Stack.Item align="center" grow>
        <PrimaryButton
          label="Join Call"
          text="Join Call"
          disabled={!roomId}
          onClick={handleEnterCall}
        />
      </Stack.Item>
    </Stack>
  );
}
