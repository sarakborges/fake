// Dependencies
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Atoms
import Form from "Components/Atoms/Form";
import Button from "Components/Atoms/Button";

// Molecules
import LabeledInput from "Components/Molecules/LabeledInput";

// Styles
import * as S from "./style";

// Template
const SearchForm = () => {
  const router = useRouter();

  const [search, setSearch] = useState();

  const handleSearchSubmit = () => {
    if (search) {
      router.push(ROUTES.SEARCH.replace(":str", search));
    }
  };

  return (
    <S.Search>
      <Form onSubmit={handleSearchSubmit}>
        <LabeledInput
          id='site-search'
          label='Encontre pessoas e grupos'
          placeholder='Insira sua pesquisa'
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />

        <Button type='submit' style='primary' size={16}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
    </S.Search>
  );
};

export default SearchForm;
