import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";

import ProvideAppContext from "./context/AppContext";
import ErrorMessage from "./components/ErrorMessage";
import Calendar from "./components/Calendar";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import NewEvent from "./components/NewEvent";

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
              <Route path="/" element={<Welcome />}>
                <Route path="calendar" element={<Calendar />} />
                <Route path="newevent" element={<NewEvent />} />
              </Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </ProvideAppContext>
    </MsalProvider>
  );
}
