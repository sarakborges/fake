// Dependencies
import { useState } from "react";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Organisms
import InfoList from "Components/Organisms/InfoList";

// Style
import * as S from "./style";

// Template
const FilteredList = ({ info, id, placeholder, title, noInfoText, type }) => {
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

            <Input
              id={id}
              placeholder={placeholder}
              value={filter}
              onChange={handleFilterChange}
              isBgContrast
            />
          </S.Header>

          <InfoList info={getFilteredInfo()} type={type} />
        </>
      ) : (
        <>
          <Text type='title' pb={16}>
            {title}
          </Text>
          <Text>{noInfoText}</Text>
        </>
      )}
    </S.Wrapper>
  );
};

export default FilteredList;
