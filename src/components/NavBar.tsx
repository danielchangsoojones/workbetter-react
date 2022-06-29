import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Container,
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import { useAppContext } from "../context/AppContext";

export default function NavBar() {
  // const app = useAppContext();
  // const user = app.user || { displayName: "", email: "" };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      {/* <Container>
        <Navbar.Brand href="/">Outlook Email</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto" navbar>
            <NavItem>
              <RouterNavLink to="/" className="nav-link">
                Home
              </RouterNavLink>
            </NavItem>
            <AuthenticatedTemplate>
              <NavItem>
                <RouterNavLink to="/mailbox" className="nav-link">
                  Mail Box
                </RouterNavLink>
              </NavItem>
            </AuthenticatedTemplate>
          </Nav>
          <Nav className="ms-auto align-items-center" navbar>
            <AuthenticatedTemplate>
              <NavDropdown
                title={<UserAvatar user={user} />}
                id="user-dropdown"
                align="end"
              >
                <h5 className="dropdown-item-text mb-0">{user.displayName}</h5>
                <p className="dropdown-item-text text-muted mb-0">
                  {user.email}
                </p>
                <Dropdown.Divider />
                <Dropdown.Item onClick={app.signOut!}>Sign Out</Dropdown.Item>
              </NavDropdown>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <NavItem>
                <Nav.Link onClick={app.signIn!}>Sign In</Nav.Link>
              </NavItem>
            </UnauthenticatedTemplate>
          </Nav>
        </Navbar.Collapse>
      </Container> */}
    </Navbar>
  );
}
