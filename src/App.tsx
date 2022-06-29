import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { ToastContainer } from "react-toastify";

import ProvideAppContext from "./context/AppContext";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
  return (
    <ProvideAppContext>
      <BrowserRouter>
        <NavBar />
        <Container>
          {/* <ErrorMessage /> */}
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* <Route path="/mailbox" element={<MailBox />} /> */}
            {/* <Route path="/mail/:mailId" element={<MailView />} /> */}
          </Routes>
          <ToastContainer />
        </Container>
      </BrowserRouter>
    </ProvideAppContext>
  );
}
