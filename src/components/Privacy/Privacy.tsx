import { useEffect } from "react";
import "./Privacy.scss";

interface BulletItem {
  title?: string;
  text: string;
}

interface CcpaRow {
  category: string;
  examples: string;
  collected: "YES" | "NO";
}

const applicationDataItems: BulletItem[] = [
  {
    title: "Geolocation Information.",
    text: "We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.",
  },
  {
    title: "Mobile Device Access.",
    text: "We may request access or permission to certain features from your mobile device, including your mobile device's storage, calendar, and other features. If you wish to change our access or permissions, you may do so in your device's settings.",
  },
  {
    title: "Push Notifications.",
    text: "We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.",
  },
];

const howWeProcessItems: BulletItem[] = [
  {
    title:
      "To facilitate account creation and authentication and otherwise manage user accounts.",
    text: "We may process your information so you can create and log in to your account, as well as keep your account in working order.",
  },
  {
    title: "To deliver and facilitate delivery of services to the user.",
    text: "We may process your information to provide you with the requested service.",
  },
  {
    title: "To respond to user inquiries/offer support to users.",
    text: "We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.",
  },
  {
    title: "To send administrative information to you.",
    text: "We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.",
  },
  {
    title: "To fulfill and manage your orders.",
    text: "We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.",
  },
  {
    title: "To enable user-to-user communications.",
    text: "We may process your information if you choose to use any of our offerings that allow for communication with another user.",
  },
  {
    title: "To request feedback.",
    text: "We may process your information when necessary to request feedback and to contact you about your use of our Services.",
  },
  {
    title: "To deliver targeted advertising to you.",
    text: "We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.",
  },
  {
    title: "To post testimonials.",
    text: "We post testimonials on our Services that may contain personal information.",
  },
  {
    title: "To protect our Services.",
    text: "We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.",
  },
  {
    title:
      "To evaluate and improve our Services, products, marketing, and your experience.",
    text: "We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.",
  },
  {
    title: "To identify usage trends.",
    text: "We may process information about how you use our Services to better understand how they are being used so we can improve them.",
  },
  {
    title: "To comply with our legal obligations.",
    text: "We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.",
  },
];

const thirdPartyCategories = [
  "User Account Registration & Authentication Services",
  "Order Fulfillment Service Providers",
  "Data Storage Service Providers",
  "Cloud Computing Services",
  "Communication & Collaboration Tools",
  "Finance & Accounting Tools",
];

const shareSituations: BulletItem[] = [
  {
    title: "Business Transfers.",
    text: "We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
  },
  {
    title: "Affiliates.",
    text: "We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.",
  },
  {
    title: "Business Partners.",
    text: "We may share your information with our business partners to offer you certain products, services, or promotions.",
  },
  {
    title: "Other Users.",
    text: "When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.",
  },
];

const ccpaRows: CcpaRow[] = [
  {
    category: "A. Identifiers",
    examples:
      "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name",
    collected: "YES",
  },
  {
    category:
      "B. Personal information as defined in the California Customer Records statute",
    examples:
      "Name, contact information, education, employment, employment history, and financial information",
    collected: "NO",
  },
  {
    category:
      "C. Protected classification characteristics under state or federal law",
    examples:
      "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data",
    collected: "NO",
  },
  {
    category: "D. Commercial information",
    examples:
      "Transaction information, purchase history, financial details, and payment information",
    collected: "NO",
  },
  {
    category: "E. Biometric information",
    examples: "Fingerprints and voiceprints",
    collected: "NO",
  },
  {
    category: "F. Internet or other similar network activity",
    examples:
      "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
    collected: "NO",
  },
  {
    category: "G. Geolocation data",
    examples: "Device location",
    collected: "YES",
  },
  {
    category: "H. Audio, electronic, sensory, or similar information",
    examples:
      "Images and audio, video or call recordings created in connection with our business activities",
    collected: "NO",
  },
  {
    category: "I. Professional or employment-related information",
    examples:
      "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
    collected: "YES",
  },
  {
    category: "J. Education Information",
    examples: "Student records and directory information",
    collected: "NO",
  },
  {
    category: "K. Inferences drawn from collected personal information",
    examples:
      "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics",
    collected: "NO",
  },
  {
    category: "L. Sensitive personal Information",
    examples: "",
    collected: "NO",
  },
];

const usStateRights = [
  "Right to know whether or not we are processing your personal data",
  "Right to access your personal data",
  "Right to correct inaccuracies in your personal data",
  "Right to request the deletion of your personal data",
  "Right to obtain a copy of the personal data you previously shared with us",
  "Right to non-discrimination for exercising your rights",
  'Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California\u2019s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")',
];

const additionalStateRights = [
  "Right to access the categories of personal data being processed (as permitted by applicable law, including Minnesota\u2019s privacy law)",
  "Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including California's and Delaware's privacy law)",
  "Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including Minnesota's and Oregon's privacy law)",
  "Right to review, understand, question, and correct how personal data has been profiled (as permitted by applicable law, including Minnesota\u2019s privacy law)",
  "Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including California\u2019s privacy law)",
  "Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including Florida\u2019s privacy law)",
];

const tocItems: { href: string; label: string }[] = [
  { href: "#infocollect", label: "1. WHAT INFORMATION DO WE COLLECT?" },
  { href: "#infouse", label: "2. HOW DO WE PROCESS YOUR INFORMATION?" },
  {
    href: "#whoshare",
    label: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
  },
  { href: "#inforetain", label: "4. HOW LONG DO WE KEEP YOUR INFORMATION?" },
  { href: "#infosafe", label: "5. HOW DO WE KEEP YOUR INFORMATION SAFE?" },
  { href: "#infominors", label: "6. DO WE COLLECT INFORMATION FROM MINORS?" },
  { href: "#privacyrights", label: "7. WHAT ARE YOUR PRIVACY RIGHTS?" },
  { href: "#DNT", label: "8. CONTROLS FOR DO-NOT-TRACK FEATURES" },
  {
    href: "#uslaws",
    label: "9. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
  },
  { href: "#policyupdates", label: "10. DO WE MAKE UPDATES TO THIS NOTICE?" },
  { href: "#contact", label: "11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" },
  {
    href: "#request",
    label:
      "12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="Custom_conatiner">
      <div className="privacy-policy">
        <h1>PRIVACY POLICY</h1>
        <p className="privacy-subtitle">Last updated March 03, 2025</p>

        <p>
          This Privacy Notice for Social Sanitation Commercial Cleaning
          Solutions LLC (doing business as Social Sanitation) ("we," "us," or
          "our"), describes how and why we might access, collect, store, use,
          and/or share ("process") your personal information when you use our
          services ("Services"), including when you:
        </p>
        <ul>
          <li>
            Download and use our mobile application (Social Sanitation) or any
            other application of ours that links to this Privacy Notice
          </li>
          <li>
            Engage with us in other related ways, including any sales,
            marketing, or events
          </li>
        </ul>
        <p>
          <strong>Questions or concerns? </strong>Reading this Privacy Notice
          will help you understand your privacy rights and choices. We are
          responsible for making decisions about how your personal information
          is processed. If you do not agree with our policies and practices,
          please do not use our Services. If you still have any questions or
          concerns, please contact us at{" "}
          <a href="mailto:socialsanitation@gmail.com">
            socialsanitation@gmail.com
          </a>
          .
        </p>

        <h2>SUMMARY OF KEY POINTS</h2>
        <p>
          <em>
            This summary provides key points from our Privacy Notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our{" "}
          </em>
          <a href="#toc">
            <em>table of contents</em>
          </a>
          <em> below to find the section you are looking for.</em>
        </p>
        <p>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use. Learn
          more about{" "}
          <a href="#personalinfo">personal information you disclose to us</a>.
        </p>
        <p>
          <strong>Do we process any sensitive personal information? </strong>
          Some of the information may be considered "special" or "sensitive" in
          certain jurisdictions, for example your racial or ethnic origins,
          sexual orientation, and religious beliefs. We do not process sensitive
          personal information.
        </p>
        <p>
          <strong>Do we collect any information from third parties?</strong> We
          do not collect any information from third parties.
        </p>
        <p>
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Learn more about{" "}
          <a href="#infouse">how we process your information</a>.
        </p>
        <p>
          <strong>
            In what situations and with which types of parties do we share
            personal information?
          </strong>{" "}
          We may share information in specific situations and with specific
          categories of third parties. Learn more about{" "}
          <a href="#whoshare">
            when and with whom we share your personal information
          </a>
          .
        </p>
        <p>
          <strong>How do we keep your information safe?</strong> We have
          adequate organizational and technical processes and procedures in
          place to protect your personal information. However, no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure, so we cannot promise or guarantee
          that hackers, cybercriminals, or other unauthorized third parties will
          not be able to defeat our security and improperly collect, access,
          steal, or modify your information. Learn more about{" "}
          <a href="#infosafe">how we keep your information safe</a>.
        </p>
        <p>
          <strong>What are your rights?</strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Learn more about{" "}
          <a href="#privacyrights">your privacy rights</a>.
        </p>
        <p>
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by visiting{" "}
          <a
            href="https://socialsanitation.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://socialsanitation.com/contact-us/
          </a>
          , or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </p>
        <p>
          Want to learn more about what we do with any information we collect?{" "}
          <a href="#toc">Review the Privacy Notice in full</a>.
        </p>

        <h2 id="toc">TABLE OF CONTENTS</h2>
        <ol className="privacy-toc">
          {tocItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ol>

        <section id="infocollect">
          <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
          <h3 id="personalinfo">Personal information you disclose to us</h3>
          <p className="privacy-in-short">
            <strong>In Short:</strong> We collect personal information that you
            provide to us.
          </p>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </p>
          <p>
            <strong>Personal Information Provided by You.</strong> The personal
            information that we collect depends on the context of your
            interactions with us and the Services, the choices you make, and the
            products and features you use. The personal information we collect
            may include the following:
          </p>
          <ul>
            <li>names</li>
            <li>phone numbers</li>
            <li>email addresses</li>
            <li>usernames</li>
            <li>mailing addresses</li>
            <li>passwords</li>
          </ul>
          <p>
            <strong>Sensitive Information.</strong> We do not process sensitive
            information.
          </p>
          <p>
            <strong>Application Data.</strong> If you use our application(s), we
            also may collect the following information if you choose to provide
            us with access or permission:
          </p>
          <ul>
            {applicationDataItems.map((item) => (
              <li key={item.title}>
                <em>{item.title}</em> {item.text}
              </li>
            ))}
          </ul>
          <p>
            This information is primarily needed to maintain the security and
            operation of our application(s), for troubleshooting, and for our
            internal analytics and reporting purposes.
          </p>
          <p>
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </p>
          <h3>Google API</h3>
          <p>
            Our use of information received from Google APIs will adhere to{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              Limited Use requirements
            </a>
            .
          </p>
        </section>

        <section id="infouse">
          <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
          <p className="privacy-in-short">
            <strong>In Short: </strong>We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent.
          </p>
          <p>
            <strong>
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </strong>
          </p>
          <ul>
            {howWeProcessItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title} </strong>
                {item.text}
              </li>
            ))}
            <li>
              <strong>
                To send you marketing and promotional communications.{" "}
              </strong>
              We may process the personal information you send to us for our
              marketing purposes, if this is in accordance with your marketing
              preferences. You can opt out of our marketing emails at any time.
              For more information, see{" "}
              <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a> below.
            </li>
          </ul>
        </section>

        <section id="whoshare">
          <h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
          <p className="privacy-in-short">
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following
            categories of third parties.
          </p>
          <p>
            <strong>
              Vendors, Consultants, and Other Third-Party Service Providers.
            </strong>{" "}
            We may share your data with third-party vendors, service providers,
            contractors, or agents ("third parties") who perform services for us
            or on our behalf and require access to such information to do that
            work. We have contracts in place with our third parties, which are
            designed to help safeguard your personal information. This means
            that they cannot do anything with your personal information unless
            we have instructed them to do it. They will also not share your
            personal information with any organization apart from us. They also
            commit to protect the data they hold on our behalf and to retain it
            for the period we instruct.
          </p>
          <p>
            The categories of third parties we may share personal information
            with are as follows:
          </p>
          <ul>
            {thirdPartyCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <p>
            We also may need to share your personal information in the following
            situations:
          </p>
          <ul>
            {shareSituations.map((item) => (
              <li key={item.title}>
                <strong>{item.title} </strong>
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section id="inforetain">
          <h2>4. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <p className="privacy-in-short">
            <strong>In Short: </strong>We keep your information for as long as
            necessary to fulfill the purposes outlined in this Privacy Notice
            unless otherwise required by law.
          </p>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this Privacy Notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </p>
        </section>

        <section id="infosafe">
          <h2>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          <p className="privacy-in-short">
            <strong>In Short: </strong>We aim to protect your personal
            information through a system of organizational and technical
            security measures.
          </p>
          <p>
            We have implemented appropriate and reasonable technical and
            organizational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorized third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
          </p>
        </section>

        <section id="infominors">
          <h2>6. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          <p className="privacy-in-short">
            <strong>In Short: </strong>We do not knowingly collect data from or
            market to children under 18 years of age.
          </p>
          <p>
            We do not knowingly collect, solicit data from, or market to
            children under 18 years of age, nor do we knowingly sell such
            personal information. By using the Services, you represent that you
            are at least 18 or that you are the parent or guardian of such a
            minor and consent to such minor dependent's use of the Services. If
            we learn that personal information from users less than 18 years of
            age has been collected, we will deactivate the account and take
            reasonable measures to promptly delete such data from our records.
            If you become aware of any data we may have collected from children
            under age 18, please contact us at{" "}
            <a href="mailto:socialsanitation@gmail.com">
              socialsanitation@gmail.com
            </a>
            .
          </p>
        </section>

        <section id="privacyrights">
          <h2>7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <p className="privacy-in-short">
            <strong>In Short:</strong> You may review, change, or terminate your
            account at any time, depending on your country, province, or state
            of residence.
          </p>
          <p id="withdrawconsent">
            <strong>
              <u>Withdrawing your consent:</u>
            </strong>{" "}
            If we are relying on your consent to process your personal
            information, which may be express and/or implied consent depending
            on the applicable law, you have the right to withdraw your consent
            at any time. You can withdraw your consent at any time by contacting
            us by using the contact details provided in the section{" "}
            <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>{" "}
            below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
          </p>
          <p>
            <strong>
              <u>Opting out of marketing and promotional communications:</u>
            </strong>{" "}
            You can unsubscribe from our marketing and promotional
            communications at any time by clicking on the unsubscribe link in
            the emails that we send, replying "STOP" or "UNSUBSCRIBE" to the SMS
            messages that we send, or by contacting us using the details
            provided in the section{" "}
            <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>{" "}
            below. You will then be removed from the marketing lists. However,
            we may still communicate with you — for example, to send you
            service-related messages that are necessary for the administration
            and use of your account, to respond to service requests, or for
            other non-marketing purposes.
          </p>
          <h3>Account Information</h3>
          <p>
            If you would at any time like to review or change the information in
            your account or terminate your account, you can:
          </p>
          <ul>
            <li>
              Log in to your account settings and update your user account.
            </li>
            <li>Contact us using the contact information provided.</li>
          </ul>
          <p>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal
            requirements.
          </p>
          <p>
            If you have questions or comments about your privacy rights, you may
            email us at{" "}
            <a href="mailto:socialsanitation@gmail.com">
              socialsanitation@gmail.com
            </a>
            .
          </p>
        </section>

        <section id="DNT">
          <h2>8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          <p>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track ("DNT") feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At
            this stage, no uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this Privacy Notice.
          </p>
          <p>
            California law requires us to let you know how we respond to web
            browser DNT signals. Because there currently is not an industry or
            legal standard for recognizing or honoring DNT signals, we do not
            respond to them at this time.
          </p>
        </section>

        <section id="uslaws">
          <h2>9. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
          <p className="privacy-in-short">
            <strong>In Short: </strong>If you are a resident of California,
            Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky,
            Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon,
            Tennessee, Texas, Utah, or Virginia, you may have the right to
            request access to and receive details about the personal information
            we maintain about you and how we have processed it, correct
            inaccuracies, get a copy of, or delete your personal information.
            You may also have the right to withdraw your consent to our
            processing of your personal information. These rights may be limited
            in some circumstances by applicable law. More information is
            provided below.
          </p>
          <h3>Categories of Personal Information We Collect</h3>
          <p>
            We have collected the following categories of personal information
            in the past twelve (12) months:
          </p>
          <table className="privacy-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Collected</th>
              </tr>
            </thead>
            <tbody>
              {ccpaRows.map((row) => (
                <tr key={row.category}>
                  <td>{row.category}</td>
                  <td>{row.examples}</td>
                  <td className="privacy-table-collected">{row.collected}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            We may also collect other personal information outside of these
            categories through instances where you interact with us in person,
            online, or by phone or mail in the context of:
          </p>
          <ul>
            <li>Receiving help through our customer support channels;</li>
            <li>Participation in customer surveys or contests; and</li>
            <li>
              Facilitation in the delivery of our Services and to respond to
              your inquiries.
            </li>
          </ul>
          <p>
            We will use and retain the collected personal information as needed
            to provide the Services or for:
          </p>
          <ul>
            <li>Category A - As long as the user has an account with us</li>
            <li>Category G - As long as the user has an account with us</li>
            <li>Category I - As long as the user has an account with us</li>
          </ul>
          <h3>Sources of Personal Information</h3>
          <p>
            Learn more about the sources of personal information we collect in{" "}
            <a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>
          </p>
          <h3>How We Use and Share Personal Information</h3>
          <p>
            Learn more about how we use your personal information in the
            section, <a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>
          </p>
          <p>
            <strong>Will your information be shared with anyone else?</strong>
          </p>
          <p>
            We may disclose your personal information with our service providers
            pursuant to a written contract between us and each service provider.
            Learn more about how we disclose personal information to in the
            section,{" "}
            <a href="#whoshare">
              WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </p>
          <p>
            We may use your personal information for our own business purposes,
            such as for undertaking internal research for technological
            development and demonstration. This is not considered to be
            "selling" of your personal information.
          </p>
          <p>
            We have not sold or shared any personal information to third parties
            for a business or commercial purpose in the preceding twelve (12)
            months. We have disclosed the following categories of personal
            information to third parties for a business or commercial purpose in
            the preceding twelve (12) months:
          </p>
          <ul>
            <li>Category A. Identifiers</li>
            <li>Category G. Geolocation data</li>
          </ul>
          <p>
            The categories of third parties to whom we disclosed personal
            information for a business or commercial purpose can be found under{" "}
            <a href="#whoshare">
              WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </p>
          <h3>Your Rights</h3>
          <p>
            You have rights under certain US state data protection laws.
            However, these rights are not absolute, and in certain cases, we may
            decline your request as permitted by law. These rights include:
          </p>
          <ul>
            {usStateRights.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
          <p>
            Depending upon the state where you live, you may also have the
            following rights:
          </p>
          <ul>
            {additionalStateRights.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
          <h3>How to Exercise Your Rights</h3>
          <p>
            To exercise these rights, you can contact us by visiting{" "}
            <a
              href="https://socialsanitation.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://socialsanitation.com/contact-us/
            </a>
            , by emailing us at{" "}
            <a href="mailto:socialsanitation@gmail.com">
              socialsanitation@gmail.com
            </a>
            , or by referring to the contact details at the bottom of this
            document.
          </p>
          <p>
            Under certain US state data protection laws, you can designate an
            authorized agent to make a request on your behalf. We may deny a
            request from an authorized agent that does not submit proof that
            they have been validly authorized to act on your behalf in
            accordance with applicable laws.
          </p>
          <h3>Request Verification</h3>
          <p>
            Upon receiving your request, we will need to verify your identity to
            determine you are the same person about whom we have the information
            in our system. We will only use personal information provided in
            your request to verify your identity or authority to make the
            request. However, if we cannot verify your identity from the
            information already maintained by us, we may request that you
            provide additional information for the purposes of verifying your
            identity and for security or fraud-prevention purposes.
          </p>
          <p>
            If you submit the request through an authorized agent, we may need
            to collect additional information to verify your identity before
            processing your request and the agent will need to provide a written
            and signed permission from you to submit such request on your
            behalf.
          </p>
          <h3>Appeals</h3>
          <p>
            Under certain US state data protection laws, if we decline to take
            action regarding your request, you may appeal our decision by
            emailing us at{" "}
            <a href="mailto:socialsanitation@gmail.com">
              socialsanitation@gmail.com
            </a>
            . We will inform you in writing of any action taken or not taken in
            response to the appeal, including a written explanation of the
            reasons for the decisions. If your appeal is denied, you may submit
            a complaint to your state attorney general.
          </p>
          <h3>California "Shine The Light" Law</h3>
          <p>
            California Civil Code Section 1798.83, also known as the "Shine The
            Light" law, permits our users who are California residents to
            request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us by using the contact
            details provided in the section{" "}
            <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
          </p>
        </section>

        <section id="policyupdates">
          <h2>10. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
          <p className="privacy-in-short">
            <em>
              <strong>In Short: </strong>Yes, we will update this notice as
              necessary to stay compliant with relevant laws.
            </em>
          </p>
          <p>
            We may update this Privacy Notice from time to time. The updated
            version will be indicated by an updated "Revised" date at the top of
            this Privacy Notice. If we make material changes to this Privacy
            Notice, we may notify you either by prominently posting a notice of
            such changes or by directly sending you a notification. We encourage
            you to review this Privacy Notice frequently to be informed of how
            we are protecting your information.
          </p>
        </section>

        <section id="contact">
          <h2>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          <p>
            If you have questions or comments about this notice, you may email
            us at{" "}
            <a href="mailto:socialsanitation@gmail.com">
              socialsanitation@gmail.com
            </a>{" "}
            or contact us by post at:
          </p>
          <address>
            Social Sanitation Commercial Cleaning Solutions LLC
            <br />
            10460 Sanderling Shores Dr
            <br />
            Tampa, FL 33619, USA
          </address>
        </section>

        <section id="request">
          <h2>
            12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>
          <p>
            Based on the applicable laws of your country or state of residence
            in the US, you may have the right to request access to the personal
            information we collect from you, details about how we have processed
            it, correct inaccuracies, or delete your personal information. You
            may also have the right to withdraw your consent to our processing
            of your personal information. These rights may be limited in some
            circumstances by applicable law. To request to review, update, or
            delete your personal information, please visit:{" "}
            <a
              href="https://socialsanitation.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://socialsanitation.com/contact-us/
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
