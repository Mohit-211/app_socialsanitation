import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

  .ty-root * {
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  .ty-root {
    min-height: 100vh;
    background: #f5f3ee;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
  }

  .ty-card {
    width: 100%;
    max-width: 640px;
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e8e4dc;
    padding: 48px 40px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  }

  .ty-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    border-radius: 50%;
    background: #f0faf4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ty-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .ty-subtitle {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .ty-btn {
    height: 50px;
    padding: 0 28px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ty-btn:hover {
    background: #2c7a4b;
  }

  @media (max-width: 560px) {
    .ty-card {
      padding: 32px 20px;
    }

    .ty-title {
      font-size: 26px;
    }
  }
`;

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13L9 17L19 7"
      stroke="#2c7a4b"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>

      <div className="ty-root">
        <div className="ty-card">
          <div className="ty-icon">
            <CheckIcon />
          </div>

          <h1 className="ty-title">Thank You</h1>

          <p className="ty-subtitle">
            Your form has been submitted successfully. <br />
            Our team will get in touch with you shortly.
          </p>

          <button className="ty-btn" onClick={() => navigate("/user-consent")}>
            Fill Another Response
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
