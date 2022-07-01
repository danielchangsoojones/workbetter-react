import { Dropdown } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

import { User } from "../type/UserType";
import config from "../utils/Config";

interface UserPropsType {
  user: User | undefined;
  subscriptionId: string | undefined;
}

export default function NavBar({ user, subscriptionId }: UserPropsType) {
  const { socket } = useAppContext();

  return (
    <header className="pb-3 mb-4 border-bottom py-4">
      <div className="d-flex align-items-center text-dark">
        <span className="fs-4 flex-grow-1">Outlook Email Inbox</span>
        {user && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              User Info
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <h6 className="dropdown-item-text mb-0">{user.username}</h6>
              <p className="dropdown-item-text mb-0">{user.email}</p>
              <Dropdown.Divider />
              <Dropdown.Item href="/msal/delegated/signout">
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
