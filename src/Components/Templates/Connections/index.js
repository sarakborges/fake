// Dependencies
import { useContext, useState } from "react";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import InfoList from "Components/Organisms/InfoList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ConnectionsTemplate = () => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [filter, setFilter] = useState("");

  const getApprovedConnections = () => {
    return profile?.connections?.filter?.((item) => {
      if (item.status === "connected") {
        return item;
      } else {
        return false;
      }
    });
  };

  const getFilteredConnections = () => {
    if (!filter) {
      return getApprovedConnections();
    }

    return getApprovedConnections().filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        `@${item.url}`.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const getFilteredBlocked = () => {
    if (!filter) {
      return profile.blockedUsers;
    }

    return profile.blockedUsers.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        `@${item.url}`.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Suas conexões`}</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <>
          <S.ProfilesListWrapper>
            <S.Header>
              <Text type='title' pb={16}>
                Suas conexões
              </Text>

              {getApprovedConnections()?.length > 0 ? (
                <Input
                  id='connections-filter'
                  placeholder='Digite o nome ou @ de quem quer encontrar'
                  value={filter}
                  onChange={handleFilterChange}
                  isBgInverted
                />
              ) : (
                <Text>Você ainda não possui conexões.</Text>
              )}
            </S.Header>

            {getApprovedConnections()?.length > 0 && (
              <InfoList
                info={getFilteredConnections().map((item) => item.user)}
                type='profile'
              />
            )}
          </S.ProfilesListWrapper>

          {profile.blockedUsers?.length > 0 && (
            <S.ProfilesListWrapper>
              <S.Header>
                <Text type='title' pb={16}>
                  Perfis bloqueados
                </Text>

                <Input
                  id='blocked-filter'
                  placeholder='Digite o nome ou @ de quem quer encontrar'
                  value={filter}
                  onChange={handleFilterChange}
                  isBgInverted
                />
              </S.Header>

              <InfoList info={getFilteredBlocked()} type='profile' />
            </S.ProfilesListWrapper>
          )}
        </>
      )}
    </AuthedTemplate>
  );
};

export default ConnectionsTemplate;
