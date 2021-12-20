// Molecules
import Tabs from "Components/Molecules/Tabs";

// Template
import AuthedTemplate from "Components/Templates/Authed";
import { ROUTES } from "Helpers/routes";

// Style
import * as S from "./style";

// Template
const SettingsTemplate = ({ children }) => {
  const tabs = [
    {
      link: ROUTES.SETTINGS.PROFILE,
      text: "Configuções de perfil",
    },

    {
      link: ROUTES.SETTINGS.ACCOUNT,
      text: "Configuções de conta",
    },

    {
      link: ROUTES.SETTINGS.SITE,
      text: "Configuções de site",
    },
  ];

  return (
    <AuthedTemplate>
      <S.SettingsWrapper>
        <div>
          <Tabs tabs={tabs} />
        </div>

        <S.SettingsContent>{children}</S.SettingsContent>
      </S.SettingsWrapper>
    </AuthedTemplate>
  );
};

export default SettingsTemplate;
