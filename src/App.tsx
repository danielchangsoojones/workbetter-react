import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import ProvideAppContext from "./context/AppContext";
import ErrorMessage from "./components/ErrorMessage";
import MailBox from "./components/MailBox";
import MailView from "./components/MailBox/MailView";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";

import "bootstrap/dist/css/bootstrap.css";

type AppProps = {
  pca: IPublicClientApplication;
};

export default function App({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <ProvideAppContext>
        <BrowserRouter>
          <NavBar />
          <Container>
            <ErrorMessage />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/mailbox" element={<MailBox />} />
              <Route path="/mail/:mailId" element={<MailView />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ProvideAppContext>
    </MsalProvider>
  );
}
