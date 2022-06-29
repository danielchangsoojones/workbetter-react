import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useAppContext } from "../context/AppContext";

export default function Welcome() {
  const { socket } = useAppContext();

  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    socket.on("notification_received", (payload: any) => {
      console.log(payload);
      // setMessages([...messages,])
    });
  });

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>Outlook Email</h1>
      </Container>
    </div>
  );
}
