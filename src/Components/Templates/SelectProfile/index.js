// Dependencies
import { useContext, useEffect } from "react";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import CreateNew from "Components/Molecules/CreateNew";

// Organisms
import FilteredSelectProfilesList from "Components/Organisms/FilteredSelectProfilesList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const SelectActiveProfileTemplate = () => {
  const { userState } = useContext(UserContext);
  const { user, profile } = userState;

  const getAllProfiles = () => {
    if (user?.profiles?.length) {
      return [
        { ...user.profiles.find((item) => item._id === profile._id) },
        ...user.profiles.filter((item) => item._id !== profile._id),
      ];
    } else {
      return [];
    }
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Selecionar perfil ativo`}</title>
      </Head>

      <S.ProfilesListWrapper>
        <CreateNew type='profile' />

        <FilteredSelectProfilesList
          id='select-profile-filter'
          placeholder='Digite o nome ou @ do perfil que quer encontrar'
          title='Qual perfil você vai usar?'
          noInfoText={`Você ainda não possui um perfil. Crie seu primeiro perfil, para poder começar a utilizar a rede.`}
          info={getAllProfiles()}
          activeProfile={profile?._id}
        />
      </S.ProfilesListWrapper>
    </AuthedTemplate>
  );
};

export default SelectActiveProfileTemplate;
