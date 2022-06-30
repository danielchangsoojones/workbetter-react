import {
  Container,
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

import { User } from "../type/UserType";
import config from "../utils/Config";

interface UserPropsType {
  user: User | undefined;
  subscriptionId: string | undefined;
}

export default function NavBar({ user, subscriptionId }: UserPropsType) {
  const { socket } = useAppContext();

  const signOut = () => {
    socket.emit("sign_out", subscriptionId);

  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="/">Outlook Email Inbox</Navbar.Brand>
        <Navbar.Toggle />
        {user && (
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center" navbar>
              <NavDropdown title={"User Info"} id="user-dropdown" align="end">
                <h6 className="dropdown-item-text mb-0">{user.username}</h6>
                <p className="dropdown-item-text mb-0">{user.email}</p>
                <Dropdown.Divider />
                <Dropdown.Item href={`${config.serverUri}/msal/delegated/signout`}>Sign Out</Dropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}
