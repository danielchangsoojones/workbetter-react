import React, { useContext, createContext } from "react";
import { io } from "socket.io-client";

type AppContext = {
  socket: any;
};

const appContext = createContext<AppContext>({
  socket: undefined,
});

export function useAppContext(): AppContext {
  return useContext(appContext);
}

interface ProvideAppContextProps {
  children: React.ReactNode;
}

export default function ProvideAppContext({
  children,
}: ProvideAppContextProps) {
  const auth = useProvideAppContext();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}

function useProvideAppContext() {
  const socket = io("ws://localhost:1337", {
    transports: ["polling"],
    path: "/socket"
  });

  return {
    socket,
  };
}
