// Dependencies
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";

// APIs
import SearchAPI from "Apis/Search";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Orgasnisms
import InfoList from "Components/Organisms/InfoList";
import SearchForm from "Components/Organisms/SearchForm";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";
import Text from "Components/Atoms/Text";

const HomeTemplate = () => {
  const router = useRouter();
  const {
    query: { str },
  } = router;

  const [searchData, setSearchData] = useState();

  const getSearch = useCallback(async () => {
    if (!str) {
      return;
    }

    const searchReq = await SearchAPI.searchByStr(str);

    if (searchReq) {
      setSearchData(searchReq);
    }
  }, [str, SearchAPI]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Busca</title>
      </Head>

      <S.ResultsWrapper>
        <div>
          <Text type='title' pb={16}>
            Sua pesquisa: "{str}"
          </Text>

          <SearchForm />
        </div>

        {!searchData?.profiles?.length && !searchData?.groups?.length && (
          <Text type='title'>
            Nenhum resultado encontrado com o texto "{str}"
          </Text>
        )}

        {searchData?.profiles?.length > 0 && (
          <div>
            <Text type='title' pb={16}>
              Perfis encontrados
            </Text>

            <InfoList type='profile' info={searchData?.profiles} />
          </div>
        )}

        {searchData?.groups?.length > 0 && (
          <div>
            <Text type='title' pb={16}>
              Grupos encontrados
            </Text>

            <InfoList type='group' info={searchData?.groups} />
          </div>
        )}
      </S.ResultsWrapper>
    </AuthedTemplate>
  );
};

export default HomeTemplate;
