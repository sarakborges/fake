// Dependencies
import { useState } from "react";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Organisms
import SelectProfileList from "Components/Organisms/SelectProfilesList";

// Style
import * as S from "./style";

// Template
const FilteredSelectProfilesList = ({
  info,
  id,
  placeholder,
  title,
  noInfoText,
  activeProfile,
}) => {
  const [filter, setFilter] = useState("");
  const getFilteredInfo = () => {
    if (!filter) {
      return info;
    }

    return info.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        `@${item.url}`.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <S.Wrapper>
      {info?.length ? (
        <>
          <S.Header>
            <Text type='title' pb={16}>
              {title}
            </Text>

            <S.Filter>
              <Input
                id={id}
                placeholder={placeholder}
                value={filter}
                onChange={handleFilterChange}
              />
            </S.Filter>
          </S.Header>

          {getFilteredInfo().length ? (
            <SelectProfileList
              profiles={getFilteredInfo()}
              activeProfile={activeProfile}
            />
          ) : (
            <Text>Nenhum resultado encontrado</Text>
          )}
        </>
      ) : (
        <>
          <Text type='title' pb={32}>
            {title}
          </Text>
          <Text>{noInfoText}</Text>
        </>
      )}
    </S.Wrapper>
  );
};

export default FilteredSelectProfilesList;
