import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
const io = require('socket.io-client');
const socket = io('http://localhost:1337/msal/wss');

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
  useEffect(() => {
  });

  return {
    socket
  };
}
