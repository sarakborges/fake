// Dependencies
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Organisms
import SettingsAccount from "Components/Organisms/SettingsAccount";

// Templates
import SettingsTemplate from "Components/Templates/Settings";

const SettingsAccountTemplate = () => {
  return (
    <SettingsTemplate>
      <Head>
        <title>{`${SITE_NAME} - Configurações de perfil`}</title>
      </Head>

      <SettingsAccount />
    </SettingsTemplate>
  );
};

export default SettingsAccountTemplate;
