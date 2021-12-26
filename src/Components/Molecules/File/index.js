// Atoms
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";

// Style
import * as S from "./style";
import { useEffect, useState } from "react";

// Template
const File = ({ id, label, value, onChange }) => {
  const nonHoverText = "Arraste o arquivo para cá";
  const hoverText = "Solte o arquivo aqui";

  const [text, setText] = useState(nonHoverText);
  const [valueImg, setValueImg] = useState();

  const handleDrag = (e) => {
    e.preventDefault();
    setText(hoverText);
  };

  const handleDragLeave = () => {
    setText(nonHoverText);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setText(nonHoverText);

    onChange({
      currentTarget: {
        name: id,
        files: [...e.dataTransfer.files],
      },
    });
  };

  useEffect(() => {
    setValueImg(value?.name ? URL.createObjectURL(value) : value);
  }, [value]);

  return (
    <S.File>
      <S.LabelText htmlFor={id}>{label}</S.LabelText>

      <S.Label
        htmlFor={id}
        onDragOver={handleDrag}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Text type='title' pb={32}>
          {text}
        </Text>
        <S.LabelButton>Ou clique aqui para encontrar seu arquivo</S.LabelButton>

        {valueImg && (
          <S.Preview>
            <Text type='subtitle' pb={16}>
              {value?.name
                ? "Prévia do arquivo a ser enviado:"
                : "Arquivo atual:"}
            </Text>
            <Avatar img={valueImg} size={128} isPreview={value?.name} />
          </S.Preview>
        )}
      </S.Label>

      <input
        id={id}
        name={id}
        type='file'
        onChange={onChange}
        accept='image/*'
      />
    </S.File>
  );
};

export default File;
