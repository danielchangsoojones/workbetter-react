import { useEffect, useState } from "react";
import { NavLink as RouterNavLink, useParams } from "react-router-dom";
import { AuthenticatedTemplate } from "@azure/msal-react";

import { useAppContext } from "../../context/AppContext";
import { Mail } from "../../type/MailBoxType";

export default function MailView() {
  const app = useAppContext();

  const [mail, setMail] = useState<Mail>();

  const { mailId } = useParams();

  useEffect(() => {
    const mail = app.getMailByID!(mailId);

    mail && setMail(mail[0]);
  });

  return (
    <AuthenticatedTemplate>
      <div className="mt-5 mb-3">
        <h4>{`${mail?.subject}`}</h4>
        <hr />
        <h6>{`${mail?.sender.emailAddress.name} ${mail?.receivedDateTime}`}</h6>
      </div>
      <div>
        <div
          className="content border rounded p-3"
          dangerouslySetInnerHTML={{ __html: mail?.body.content || "" }}
        ></div>
      </div>
    </AuthenticatedTemplate>
  );
}
