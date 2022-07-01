import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";

import NavBar from "./NavBar";
import { useAppContext } from "../context/AppContext";
import { User } from "../type/UserType";
import MailRow from "./MailRow";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
  },
};

Modal.setAppElement("#root");

export default function MainPage() {
  const { socket } = useAppContext();
  const { subscriptionId } = useParams();

  const [disconnected, setDisconnected] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [messages, setMessages] = useState<Array<any>>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<any>();

  useEffect(() => {
    socket.on("notification_received", (payload: any) => {
      setMessages((prev) => [payload, ...prev]);

      toast("New Email", {
        position: "bottom-right",
        autoClose: 1000,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
      });
    });

    socket.on("user", (user: User) => {
      setUser(user);
      setDisconnected(false);
    });

    socket.on("inbox", (inbox: Array<any>) => {
      setMessages(inbox);
    });

    socket.on("error", (error: string) => {
      console.error(error);
      setDisconnected(true);
    });

    return () => {
      socket.off("notification_received");
      socket.off("error");
      socket.off("inbox");
      socket.off("user");
    };
  });

  useEffect(() => {
    disconnected && socket.emit("create_room", subscriptionId);
  }, [disconnected]);

  useEffect(() => {
    currentMessage && openModal();
  }, [currentMessage]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentMessage(null);
  };

  return (
    <div>
      <NavBar user={user} subscriptionId={subscriptionId} />
      <div className="p-3 mb-4 bg-light rounded-3">
        <div className="table-responsive">
          {messages && (
            <Table size="sm mail-table">
              <thead>
                <tr>
                  <th>Received Time</th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((item: any, ind: number) => (
                  <MailRow
                    message={item}
                    key={`mailview-${ind}`}
                    setCurrentMessage={setCurrentMessage}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Detail"
      >
        {currentMessage && (
          <form>
            <h5 className="p-0 m-0">{currentMessage.subject}</h5>
            <hr className="m-1" />
            <div className="d-flex justify-content-between">
              <span>
                <strong>{`${currentMessage.sender.emailAddress.name}`}</strong>{" "}
                {`${currentMessage.sender.emailAddress.address}`}
              </span>
              <span>{`${currentMessage.receivedDateTime}`}</span>
            </div>
            <div
              className="content border rounded p-3 mt-3"
              dangerouslySetInnerHTML={{
                __html: currentMessage.body.content || "",
              }}
            ></div>
          </form>
        )}
        <hr />
        <Button onClick={closeModal}>close</Button>
      </Modal>
    </div>
  );
}
