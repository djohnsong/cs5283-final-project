# Video Conferencing using WebRTC

## Overview

Simple video chat app using webRTC and websockets. The appliction uses Socket.io to allow users to create and join rooms and handle the initial communication. PeerJS is used to setup Peer-to-peer communication using WebRTC.

The main files to note with regards to the web-sockets and WebRTC implementation are server.ts and ConnectionManger.ts. Server.ts sets up the initial server so clients can establish communication via web-sockets. The ConnectionManager is client side code to connect to the server and establish the peer-to-peer communication.


## setup

Start express web server:

```bash
yarn run server
```

Start Peerjs dev server (used as the to establish the peer-to-peer connections):

```bash
yarn run peer
```

Last, run the React application:

```bash
yarn run start
```

The application should now be running on port 3000
