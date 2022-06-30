import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import ProvideAppContext from "./context/AppContext";
import MainPage from "./components/MainPage";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
  return (
    <ProvideAppContext>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/msal/watch/:subscriptionId" element={<MainPage />} />
          </Routes>
          <ToastContainer />
        </Container>
      </BrowserRouter>
    </ProvideAppContext>
  );
}
