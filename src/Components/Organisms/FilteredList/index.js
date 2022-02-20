// Dependencies
import { useCallback, useEffect, useState } from "react";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Organisms
import InfoList from "Components/Organisms/InfoList";

// Style
import * as S from "./style";

// Template
const FilteredList = ({
  info,
  id,
  placeholder,
  title,
  noInfoText,
  type,
  parentInfo,
}) => {
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([...info]);

  const getFilteredInfo = useCallback(() => {
    if (!filter) {
      setFilteredList([...info]);
    }

    setFilteredList(
      info.filter(
        (item) =>
          item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
          `@${item.url}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
      ) || []
    );
  }, [info, filter, setFilteredList]);

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    getFilteredInfo();
  }, [getFilteredInfo]);

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
            />
          </S.Header>

          <InfoList info={filteredList} type={type} parentInfo={parentInfo} />
        </>
      ) : (
        <S.Header>
          <Text type='title' pb={16}>
            {title}
          </Text>

          <Text>{noInfoText}</Text>
        </S.Header>
      )}
    </S.Wrapper>
  );
};

export default FilteredList;
