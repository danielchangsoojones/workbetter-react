import React, {
  useContext,
  createContext,
} from "react";
const io = require('socket.io-client');
const socket = io('http://localhost:5000');

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
  return {
    socket
  };
}
