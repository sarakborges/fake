// Dependencies
import { useContext, useEffect, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";
import ImageAPI from "Apis/Image";

// Contexts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Helpers
import { TOASTS } from "Helpers/Constants";

// Atoms
import Button from "Components/Atoms/Button";
import Textarea from "Components/Atoms/Textarea";
import Text from "Components/Atoms/Text";
import Form from "Components/Atoms/Form";

// Molecules
import File from "Components/Molecules/File";

// Styles
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

// Template
const NewFeed = ({ feed, setFeed }) => {
  const baseFormField = {
    value: "",
    error: "",
  };

  const baseForm = {
    text: { ...baseFormField },
    image: { ...baseFormField },
  };

  const [isRequesting, setIsRequesting] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);
  const [valueImg, setValueImg] = useState();
  const [form, setForm] = useState({ ...baseForm });

  const { userState } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { profile } = userState;

  const displayToast = (toast) => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        ...TOASTS[toast],
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const handleSubmit = async () => {
    try {
      if (!profile._id) {
        return;
      }

      setIsRequesting(true);

      let imageUploaded = "";

      if (form.image.value) {
        imageUploaded = await ImageAPI.uploadFile(form.image.value);
      }

      const newPost = await ProfileAPI.createPost({
        userId: profile._id,
        text: form.text.value,
        image: imageUploaded?.url,
      });

      const newFeed = [
        ...feed,
        {
          ...newPost,
          user: {
            name: profile.name,
            avatar: profile.avatar,
            url: profile.url,
          },
        },
      ];
      newFeed.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

      setFeed([...newFeed]);

      setForm({ ...baseForm });

      displayToast("newPostSuccess");
      setDisplayImage(false);
      setIsRequesting(false);
    } catch (e) {
      console.log(e);
      displayToast("newPostError");
      setIsRequesting(false);
    }
  };

  const handleImageButton = () => {
    const newState = !displayImage;
    setDisplayImage(newState);

    if (!newState) {
      setForm({
        ...form,
        image: { ...baseFormField },
      });
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

  useEffect(() => {
    setValueImg(
      form?.image?.value?.name
        ? URL.createObjectURL(form?.image?.value)
        : form?.image?.value
    );
  }, [form]);

  return (
    <Form onSubmit={handleSubmit}>
      <Text type='title'>Fazer nova publicação</Text>

      <S.NewFeed>
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
            Preview={
              <S.ContentPreview>
                <img src={valueImg} />
              </S.ContentPreview>
            }
          />
        )}
      </S.NewFeed>

      <S.FeedButtons>
        <div>
          <Button style='secondary' size={16} onClick={handleImageButton}>
            <FontAwesomeIcon icon={faImage} />
            <span>{displayImage ? "Remover" : "Anexar"} imagem</span>
          </Button>
        </div>

        <Button
          type='submit'
          style='primary'
          size={16}
          disabled={isRequesting || (!form.image.value && !form.text.value)}
        >
          Publicar
        </Button>
      </S.FeedButtons>
    </Form>
  );
};

export default NewFeed;
