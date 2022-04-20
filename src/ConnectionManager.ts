import { io, Socket } from "socket.io-client";
import Peer from "peerjs";
import EventEmitter from "events";

export interface UserStreams {
  [userId: string]: MediaStream;
}

export class Connection extends EventEmitter {
  // use Singleton pattern to prevent multiple connections from being established
  private static instance: Connection;

  private readonly peer!: Peer;
  private readonly socket!: Socket;
  private _userId!: string;
  private roomId?: string;

  private _videoStreams: UserStreams = {};

  private constructor() {
    super();
    this.peer = new Peer(undefined, {
      host: "/",
      port: 5001,
    });

    this.socket = io("localhost:5000/");
  }

  static connect(): Connection {
    if (Connection.instance) return Connection.instance;

    const connection = new Connection();

    connection.peer.on("open", (userId) => {
      connection._userId = userId;

      connection.emitJoinRoom();

      connection.socket.on("user-joined", (callerUserId) => {
        connection.connectToUser(callerUserId);
      });

      connection.socket.on("user-left", (userId) => {
        connection.removeStream(userId);
      });

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream: MediaStream) => {
          connection.addStream(userId, stream);

          connection.peer.on("call", (call) => {
            call.answer(stream);

            call.on("stream", (callerVideoStream: MediaStream) => {
              connection.addStream(call.peer, callerVideoStream);
            });
          });

          connection.emit("stream-activated");
        });
    });

    Connection.instance = connection;
    return connection;
  }

  get videoStreams(): UserStreams {
    return this._videoStreams;
  }

  get userId(): string {
    return this._userId;
  }

  joinRoom(roomId: string) {
    this.roomId = roomId;
    this.emitJoinRoom();
  }

  private emitJoinRoom() {
    // only try and join room if both userId and roomId have been established
    if (!(this.roomId && this._userId)) return;

    this.socket.emit("join-room", this.roomId, this._userId);
  }

  private connectToUser(callerUserId: string) {
    const myStream = this._videoStreams[this._userId];

    if (!myStream) {
      setTimeout(() => this.connectToUser(callerUserId), 10);
    }

    const call = this.peer.call(callerUserId, myStream);

    call.on("stream", (userVideoStream: MediaStream) => {
      this.addStream(callerUserId, userVideoStream);
    });

    call.on("close", () => {
      this.removeStream(callerUserId);
    });
  }

  private addStream(userId: string, stream: MediaStream) {
    this._videoStreams[userId] = stream;
    this.emit("streams-updated");
  }

  private removeStream(userId: string) {
    delete this._videoStreams[userId];
    this.emit("streams-updated");
  }
}
