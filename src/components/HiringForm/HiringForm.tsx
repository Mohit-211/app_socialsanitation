import { useNavigate } from "react-router-dom";
import "./HiringForm.scss";

type HiringFormLanguageChoice = "english" | "spanish";

const HiringForm = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: HiringFormLanguageChoice) => {
    if (lang === "english") {
      navigate("/hiring-form-en");
    } else if (lang === "spanish") {
      navigate("/hiring-form-es");
    }
  };

  return (
    <div className="hiring-form-container">
      <div className="language-modal-backdrop">
        <div className="language-modal">
          <h2>Select Your Language</h2>
          <p>
            Please choose your preferred language to fill out the hiring form.
          </p>
          <div className="language-buttons">
            <button
              className="lang-btn english"
              onClick={() => handleLanguageSelect("english")}
            >
              English
            </button>
            <button
              className="lang-btn spanish"
              onClick={() => handleLanguageSelect("spanish")}
            >
              Español
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringForm;
