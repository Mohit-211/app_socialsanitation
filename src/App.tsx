import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import HiringForm from "./components/HiringForm/HiringForm";
import JobApplicationForm from "./components/JobApplication/JobApplicationForm";
import ThankYou from "./components/JobApplication/ThankYou";
import UserConsent from "./components/UserConsent/UserConsent";
import ThankYouPage from "./components/UserConsent/ThankYouPage";
import Privacy from "./components/Privacy/Privacy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hiring-form" element={<HiringForm />} />
      <Route
        path="/hiring-form-en"
        element={<JobApplicationForm language="en" />}
      />
      <Route
        path="/hiring-form-es"
        element={<JobApplicationForm language="es" />}
      />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/user-consent" element={<UserConsent />} />
      <Route path="/user-consent/thank-you" element={<ThankYouPage />} />
      <Route path="/privacy-policy" element={<Privacy />} />
    </Routes>
  );
}

export default App;
