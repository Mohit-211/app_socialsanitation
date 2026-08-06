import { Button } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { IoBriefcaseOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const counties = [
  "Hillsborough County",
  "Pinellas County",
  "Polk County",
  "Pasco County",
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="home-about">
        <div className="home-about__logo">
          <img src="/logo.png" alt="Social Sanitation logo" />
        </div>
        <div className="home-about__copy">
          <h1>About Us</h1>
          <p>
            Welcome to Social Sanitation. We are Central Florida&rsquo;s #1
            Rated Commercial Cleaning Company. We&rsquo;ve been in operation
            since the start of the COVID-19 pandemic. Our main operating office
            is located in Tampa, FL. We currently service areas of Central
            Florida, in counties such as: Hillsborough County, Pinellas County,
            Polk County, Pasco County and more.
          </p>
          <p>
            Since 2019, the COVID-19 pandemic has taken over our work
            environment and caused a social divide. We bring reassurance to our
            customers, safety first. Our refined sanitizing methods make your
            workplace a safe environment for both staff employees, and their
            customers. A clean and safe work environment is key to promoting
            future business and maintaining stability in the workplace.
            We&rsquo;re here to make your workplace great again.
          </p>
          <ul className="home-about__counties">
            {counties.map((county) => (
              <li key={county}>{county}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-actions">
        <div className="home-action-card home-action-card--primary">
          <IoBriefcaseOutline className="home-action-card__icon" />
          <h2>Join Our Team</h2>
          <p>
            We&rsquo;re hiring across Central Florida. Start your application in
            English or Spanish.
          </p>
          <Button
            type="primary"
            className="home-btn-primary"
            onClick={() => navigate("/hiring-form")}
          >
            Start Application <IoIosArrowForward />
          </Button>
        </div>
        <div className="home-action-card">
          <IoShieldCheckmarkOutline className="home-action-card__icon" />
          <h2>Privacy Notice</h2>
          <p>Read how we collect, use, and protect your information.</p>
          <Button onClick={() => navigate("/privacy-policy")}>
            View Privacy Policy <IoIosArrowForward />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
