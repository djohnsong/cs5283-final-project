import React, { useEffect, useState } from "react";
import { Connection } from "./ConnectionManager";

export interface ISocketContext {
  joinRoom: (roomId: string, userId: string) => void;
}

export const SocketContext = React.createContext<Connection>({} as Connection);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connection, setConnection] = useState<Connection | undefined>();
  useEffect(() => {
    const conn = Connection.connect();
    conn.on("stream-activated", () => {
      if (!connection) setConnection(conn);
    });
  }, []);

  return (
    <>
      {connection ? (
        <SocketContext.Provider value={connection}>
          {children}
        </SocketContext.Provider>
      ) : (
        <div>LOADING</div>
      )}
    </>
  );
};
