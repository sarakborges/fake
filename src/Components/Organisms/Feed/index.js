// Dependencies
import { useCallback, useEffect, useState } from "react";

// Molecules
import NoFeed from "Components/Molecules/NoFeed";

// Organisms
import FeedItem from "Components/Organisms/FeedItem";
import NewFeed from "Components/Organisms/NewFeed/";

// Styles
import * as S from "./style";

// Template
const Feed = ({ profile, connections, displayNewFeed }) => {
  const [feed, setFeed] = useState();

  const handleDelete = (postId) => {
    setFeed(feed.filter((item) => item._id !== postId));
  };

  const getFeed = useCallback(() => {
    if (!profile?._id) {
      return;
    }

    let feedRet = [];

    if (connections?.length) {
      const connectionsContainingFeed = connections
        ?.map((item) => item.user)
        .filter((item) => item.feed?.length > 0);

      if (connectionsContainingFeed?.length) {
        for (let connection of connectionsContainingFeed) {
          const connectionFeed = connection.feed.map((item) => {
            return {
              ...item,

              user: { ...connection },
            };
          });

          feedRet = [...feedRet, ...connectionFeed];
        }
      }
    }

    if (profile?.feed) {
      feedRet = [
        ...feedRet,
        ...profile?.feed.map((item) => {
          return {
            ...item,
            user: { ...profile },
          };
        }),
      ];
    }

    feedRet.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

    setFeed(feedRet);
  }, [setFeed, profile, connections]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return (
    <>
      {displayNewFeed && <NewFeed feed={feed} setFeed={setFeed} />}

      {feed?.length > 0 ? (
        <S.Feed>
          {feed.map((item) => {
            return (
              <FeedItem key={item._id} setFeed={handleDelete} info={item} />
            );
          })}
        </S.Feed>
      ) : (
        <NoFeed />
      )}
    </>
  );
};

export default Feed;
