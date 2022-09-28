import React from "react";
import { useTranslation } from "react-i18next";

const Home = (): JSX.Element => {
  const { t } = useTranslation(["home"]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <h1 className="text-center">{t("home")}</h1>
      </div>
    </React.Fragment>
  );
};

export default Home;
