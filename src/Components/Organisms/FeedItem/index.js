// Dependencies
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Contexsts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";
import Button from "Components/Atoms/Button";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Styles
import * as S from "./style";

const FeedItem = ({ info, setFeed }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const handleDelete = async () => {
    try {
      await ProfileAPI.deletePost({
        userId: info.user._id,
        postId: info._id,
      });

      setFeed(info._id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <S.FeedItem>
      <S.Header>
        <S.InfoAreaWrapper>
          <Link href={ROUTES.PROFILE.replace(":id", info.user.url)}>
            <a>
              <InfoArea side='left' info={info.user} />
            </a>
          </Link>
        </S.InfoAreaWrapper>

        {profile?._id === info.user._id && (
          <Button style='borderless' size={12} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        )}
      </S.Header>

      <S.Content>
        {info.image && (
          <S.ImageWrapper isBlured={info.user.isAdult && !displayAdult}>
            <img src={info.image} />
          </S.ImageWrapper>
        )}

        {info.text && (
          <Text type='custom' fc='white'>
            {info.text}
          </Text>
        )}
      </S.Content>

      {/* <S.FeedLike hasLike>
                      <FontAwesomeIcon icon={faHeart} />
                    </S.FeedLike> */}

      <S.Date>
        <Text type='custom' fs={12} fc='bgInverted'>
          Postado {getTimeString(info.postedAt, true)}
        </Text>
      </S.Date>
    </S.FeedItem>
  );
};

export default FeedItem;
