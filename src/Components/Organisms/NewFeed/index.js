// Dependencies
import { useContext, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";
import ImageAPI from "Apis/Image";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";
import Textarea from "Components/Atoms/Textarea";
import Text from "Components/Atoms/Text";
import Form from "Components/Atoms/Form";

// Molecules
import File from "Components/Molecules/File";

// Styles
import * as S from "./style";

// Template
const NewFeed = () => {
  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    text: { ...baseFormField },
    image: { ...baseFormField },
  };

  const [displayImage, setDisplayImage] = useState(false);
  const [form, setForm] = useState({ ...baseForm });

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const handleSubmit = async () => {
    try {
      if (!profile._id) {
        return;
      }

      let imageUploaded = "";

      if (form.image.value) {
        imageUploaded = await ImageAPI.uploadFile(form.image.value);
      }

      await ProfileAPI.createPost({
        userId: profile._id,
        text: form.text.value,
        image: imageUploaded,
      });

      setForm({ ...baseForm });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const tar = e.currentTarget;

    setForm({
      ...form,

      [tar.name]: {
        value: tar.files?.length ? tar.files[0] : tar.value,
        error: "",
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <S.NewFeed>
        <Text type='title'>Fazer nova publicação</Text>

        <Textarea
          id='text'
          placeholder='Seu texto aqui'
          size={160}
          value={form.text.value}
          onChange={handleChange}
        />

        {displayImage && (
          <File
            id='image'
            value={form.image.value}
            onChange={handleChange}
            placeholder='Arraste sua imagem para cá'
            placeholderHover='Solte sua imagem aqui'
          />
        )}

        <S.PublishFeed>
          <Button
            style='secondary'
            size={16}
            onClick={() => setDisplayImage(!displayImage)}
          >
            {displayImage ? "Remover" : "Anexar"} imagem
          </Button>

          <Button type='submit' style='primary' size={16}>
            Publicar
          </Button>
        </S.PublishFeed>
      </S.NewFeed>
    </Form>
  );
};

export default NewFeed;
