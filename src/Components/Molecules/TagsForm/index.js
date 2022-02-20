// Dependencies
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";
import Input from "Components/Atoms/Input";
import Button from "Components/Atoms/Button";

// Molecules
import TagsList from "Components/Molecules/TagsList";

// Style
import * as S from "./style";

// Template
const TagsForm = ({ title, tags, setTags, type }) => {
  const [newTag, setNewTag] = useState("");

  const handleChange = (e) => {
    setNewTag(e.currentTarget.value.toLowerCase());
  };

  const handleClick = () => {
    setTags([...tags, newTag.trim()], type);
    setNewTag("");
  };

  const handleRemove = (tag) => {
    setTags([...tags.filter((item) => item !== tag)], type);
  };

  return (
    <S.TagsForm>
      <Text type='custom' fs={12}>
        {title}
      </Text>

      <S.TagsWrapper>
        {tags?.length > 0 && (
          <TagsList tags={tags} handleRemove={handleRemove} highlighted />
        )}

        <S.NewTag>
          <Input
            id='new-public-tag'
            placeholder='Insira uma tag'
            value={newTag}
            onChange={handleChange}
            isBgContrast
          />

          <Button style='primary' size={16} onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </S.NewTag>
      </S.TagsWrapper>
    </S.TagsForm>
  );
};

export default TagsForm;
