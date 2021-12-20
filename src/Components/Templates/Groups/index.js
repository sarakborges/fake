// Dependencies
import { useContext } from "react";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import CreateNew from "Components/Molecules/CreateNew";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupsTemplate = () => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getOwnedGroups = () => {
    return profile?.groups?.filter((item) => {
      return (
        item.owner === profile._id || item.moderators.includes(profile._id)
      );
    });
  };

  const getNonOwnedGroups = () => {
    return profile?.groups?.filter((item) => {
      return (
        item.owner !== profile._id && !item.moderators.includes(profile._id)
      );
    });
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Seus grupos`}</title>
      </Head>

      {profile && (
        <S.GroupsListWrapper>
          <CreateNew type='group' />

          <FilteredList
            info={getNonOwnedGroups()}
            id='non-owned-groups-filter'
            type='group'
            placeholder='Digite o nome ou @ do grupo que quer encontrar'
            title={`Grupos que você participa`}
            noInfoText={`Você ainda não participa de nenhum grupo. Explore um pouco, que você encontrará um grupo perfeito pra você!`}
          />

          <FilteredList
            info={getOwnedGroups()}
            id='owned-groups-filter'
            type='group'
            placeholder='Digite o nome ou @ do grupo que quer encontrar'
            title={`Grupos que você gerencia`}
            noInfoText={`Você ainda não gerencia nenhum grupo. Mas, hey! Isso não é da conta de ninguém. Caso você queira criar um grupo, pode clicar ali em cima.`}
          />
        </S.GroupsListWrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupsTemplate;
