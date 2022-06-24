import { Button, Container } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import { useAppContext } from "../context/AppContext";

export default function Welcome() {
  const app = useAppContext();

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>Outlook Email</h1>
        <AuthenticatedTemplate>
          <div>
            <h4>Welcome {app.user?.displayName || ""}!</h4>
            <p>Use the navigation bar at the top of the page to get started.</p>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button color="primary" onClick={app.signIn!}>
            Click here to sign in
          </Button>
        </UnauthenticatedTemplate>
      </Container>
    </div>
  );
}
