// Dependencies
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import SettingsSite from "Components/Organisms/SettingsSite";

// Template Wrapper
import SettingsTemplate from "Components/Templates/Settings";

// Template
const SettingsSiteTemplate = () => {
  return (
    <SettingsTemplate>
      <Head>
        <title>{`${SITE_NAME} - Configurações de perfil`}</title>
      </Head>

      <SettingsSite />
    </SettingsTemplate>
  );
};

export default SettingsSiteTemplate;
