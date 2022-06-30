import { Button } from "react-bootstrap";

interface MailRowProps {
  message: any;
  setCurrentMessage: Function;
};

export default function MailRow({
  message,
  setCurrentMessage,
}: MailRowProps) {
  const onClickHandler = () => {
    setCurrentMessage(message);
  };

  return (
    <tr>
      <td>{message.receivedDateTime}</td>
      <td>{`${message.sender?.emailAddress?.name} (${message.sender?.emailAddress?.address})`}</td>
      <td>{message.subject}</td>
      <td>
        <Button onClick={onClickHandler}>View</Button>
      </td>
    </tr>
  );
}
