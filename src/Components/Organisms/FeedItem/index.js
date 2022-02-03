// Dependencies
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

// Helpers
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Styles
import * as S from "./style";

// Template
const FeedItem = ({ info }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <S.FeedItem>
      <S.InfoAreaWrapper>
        <Link href={ROUTES.PROFILE.replace(":id", info.user.url)}>
          <a>
            <InfoArea side='left' info={info.user} />
          </a>
        </Link>
      </S.InfoAreaWrapper>

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

      {/* <S.FeedLike hasLike>
                      <FontAwesomeIcon icon={faHeart} />
                    </S.FeedLike> */}

      <Text type='custom' fs={12} fc='bgInverted'>
        Postado {getTimeString(info.postedAt, true)}
      </Text>
    </S.FeedItem>
  );
};

export default FeedItem;
