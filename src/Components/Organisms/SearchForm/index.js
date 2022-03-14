// Dependencies
import { useCallback, useEffect, useState } from "react";

// APIs
import SearchAPI from "Apis/Search";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Organisms
import InfoListHorizontal from "Components/Organisms/InfoListHorizontal";

// Styles
import * as S from "./style";

const SearchForm = ({ isBgContrast }) => {
  const [displayResults, setDisplayResults] = useState(false);
  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState();

  const getSearch = useCallback(async () => {
    if (!search) {
      setSearchData();
      return;
    }

    const searchReq = await SearchAPI.searchByStr(search);

    if (searchReq) {
      setSearchData(searchReq);
    } else {
      setSearchData();
    }
  }, [search, SearchAPI]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  return (
    <S.Search>
      <Input
        id='site-search'
        placeholder='Insira sua pesquisa'
        value={search}
        isBgContrast={!isBgContrast}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
        onFocus={() => {
          setDisplayResults(true);
        }}
        onBlur={() => {
          setDisplayResults(false);
        }}
      />

      <S.SearchResults
        displayResults={
          displayResults &&
          (searchData?.profiles?.length || searchData?.groups?.length)
        }
      >
        {searchData?.profiles?.length > 0 && (
          <div>
            <Text>Perfis encontrados:</Text>

            <InfoListHorizontal type='profile' info={searchData?.profiles} />
          </div>
        )}

        {searchData?.groups?.length > 0 && (
          <div>
            <Text>Grupos encontrados:</Text>

            <InfoListHorizontal type='group' info={searchData?.groups} />
          </div>
        )}
      </S.SearchResults>
    </S.Search>
  );
};

export default SearchForm;
