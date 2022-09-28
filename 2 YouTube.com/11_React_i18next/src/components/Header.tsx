import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Header = (): JSX.Element => {
  const { i18n, t } = useTranslation(["common"]);

  // console.log({ i18n });

  React.useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length! > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("event.target.value:", event.target.value);
    // console.log(localStorage.getItem("i18nextLng"));
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        React i18next App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <select
              className="nav-link bg-dark border-0 ml-1 mr-2"
              value={localStorage.getItem("i18nextLng" as string) || undefined}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="pl">Polski</option>
            </select>
          </li>
          <li className="nav-item ml-2">
            <Link className="nav-link" to="/profile">
              {t("profile")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
