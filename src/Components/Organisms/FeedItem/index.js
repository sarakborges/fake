// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getTimeString } from "Helpers/Functions";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Styles
import * as S from "./style";

// Template
const FeedItem = ({ info }) => {
  return (
    <S.FeedItem>
      <InfoArea side='left' info={info.user} />

      {info.image && <img src={info.image} />}

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
