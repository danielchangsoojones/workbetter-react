import { NavLink as RouterNavLink } from "react-router-dom";

import { Mail } from "../../type/MailBoxType";

type MailBoxRowProps = {
  mail: Mail;
};

export default function MailBoxRow(props: MailBoxRowProps) {
  const { mail } = props;

  return (
    <tr>
      <td>{mail.receivedDateTime}</td>
      <td>{`${mail.sender?.emailAddress?.name} (${mail.sender?.emailAddress?.address})`}</td>
      <td>{mail.subject}</td>
      <td>
        <RouterNavLink
          to={`/mail/${mail.id}`}
          className="btn btn-success btn-sm"
        >
          View
        </RouterNavLink>
      </td>
    </tr>
  );
}
