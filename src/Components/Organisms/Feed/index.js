// Organisms
import FeedItem from "Components/Organisms/FeedItem";

// Styles
import * as S from "./style";

// Template
const Feed = ({ info }) => {
  return (
    <S.Feed>
      {info?.length > 0 &&
        info.map((item, key) => {
          return <FeedItem key={`feed-item${key}`} info={item} />;
        })}
    </S.Feed>
  );
};

export default Feed;
