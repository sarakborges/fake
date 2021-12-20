// Dependencies
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import SettingsProfile from "Components/Organisms/SettingsProfile";

// Template
import SettingsTemplate from "Components/Templates/Settings";

// Template
const SettingsProfileTemplate = () => {
  return (
    <SettingsTemplate>
      <Head>
        <title>{`${SITE_NAME} - Configurações de perfil`}</title>
      </Head>

      <SettingsProfile />
    </SettingsTemplate>
  );
};

export default SettingsProfileTemplate;
