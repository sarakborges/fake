// Dependencies
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Components
import Button from "Components/Form/Button";
import Input from "Components/Form/Input";

// Style
import * as s from "./style";

// Template
const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <s.Container>
      <s.Text>
        <Input
          placeholder='Buscar'
          value={search}
          setValue={setSearch}
          customStyle={{ height: "40px", padding: "0 15px" }}
        />
      </s.Text>

      <Button customStyle={{ height: "40px", width: "40px", fontSize: "20px" }}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </s.Container>
  );
};

export default SearchBar;
