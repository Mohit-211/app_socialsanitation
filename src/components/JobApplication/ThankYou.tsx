import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/hiring-form");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          Thank You for Submitting Your Details!
        </h1>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <p>Your information has been submitted successfully.</p>
          <p>
            We’re currently reviewing the details you've provided and will
            follow up if anything further is needed.
          </p>
          <p>
            If you have any questions or updates, feel free to reach out to us
            directly.
          </p>
        </div>

        <button
          onClick={handleContinue}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#243352",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Continue to New Hiring Form
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
