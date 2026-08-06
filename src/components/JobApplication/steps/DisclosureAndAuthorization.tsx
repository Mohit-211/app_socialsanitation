import { useEffect } from "react";
import { useTranslation } from "../../../translation/useTranslation";
import type { Language } from "../../../translation/types";

interface DisclosureAndAuthorizationProps {
  language: Language;
}

// Pure static legal copy - no form fields, matching the original component's shape.
// English has 3 paragraphs, Spanish combines two of them into one - handled generically
// by mapping over whatever the locale provides rather than hardcoding a paragraph count.
const DisclosureAndAuthorization = ({
  language,
}: DisclosureAndAuthorizationProps) => {
  const { tList } = useTranslation(language);
  const paragraphs = tList("disclosureAndAuthorization.paragraphs");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default DisclosureAndAuthorization;
