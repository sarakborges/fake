// Dependencies
import { UserContext } from "Contexts/User";
import Head from "next/head";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { useContext, useState } from "react";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

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

  const getFilteredConnections = () => {
    if (!filter) {
      return profile?.connections;
    }

    return profile?.connections.filter(
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

      {profile && (
        <S.ProfilesListWrapper>
          {profile?.connections?.length > 0 ? (
            <>
              <S.Header>
                <Text type='title' pb={16}>
                  Suas conexões
                </Text>

                <S.Filter>
                  <Input
                    id='connections-filter'
                    placeholder='Digite o nome ou @ de quem quer encontrar'
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </S.Filter>
              </S.Header>

              <InfoList info={getFilteredConnections()} type='profile' />
            </>
          ) : (
            <>
              <Text type='title' pb={16}>
                Você ainda não possui conexões
              </Text>

              <Text>
                Explore um pouco, que você encontrará conexões rapidinho!
              </Text>
            </>
          )}
        </S.ProfilesListWrapper>
      )}
    </AuthedTemplate>
  );
};

export default ConnectionsTemplate;
