import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { AuthenticatedTemplate } from "@azure/msal-react";

import { Mail } from "../../type/MailBoxType";
import { useAppContext } from "../../context/AppContext";
import MailBoxRow from "./MailBoxRow";

function MailBox() {
  const app = useAppContext();

  const [mails, setMails] = useState<Array<Mail>>();

  useEffect(() => {
    app.mails && setMails(app.mails);
  }, [app.mails]);

  return (
    <AuthenticatedTemplate>
      <div className="mt-5">
        <h1 className="mb-3">Mail Box</h1>
      </div>
      <div className="table-responsive">
        {mails && (
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
              {mails.map((mail: Mail) => (
                <MailBoxRow mail={mail} key={`mail-${mail.id}`} />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </AuthenticatedTemplate>
  );
}

export default MailBox;
