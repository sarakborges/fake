// Dependencies
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Atoms
import Input from "Components/Atoms/Input";
import Form from "Components/Atoms/Form";
import Button from "Components/Atoms/Button";

// Styles
import * as S from "./style";

const SearchForm = ({ isBgContrast }) => {
  const router = useRouter();

  const [search, setSearch] = useState();

  const handleSubmit = () => {
    if (search.trim()) {
      router.push(ROUTES.SEARCH.replace(":str", search));
    }
  };

  return (
    <S.Search>
      <Form onSubmit={handleSubmit}>
        <Input
          id='site-search'
          placeholder='Encontre pessoas e grupos'
          value={search}
          isBgContrast={!isBgContrast}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />

        <Button type='submit' style='primary' size={14}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
    </S.Search>
  );
};

export default SearchForm;
