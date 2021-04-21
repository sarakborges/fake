// Dependencies
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/Link";
import Head from "next/head";
import Image from "next/image";

// APIs
import UserAPI from "Apis/User";
import FeedAPI from "Apis/Feed";

// Template Wrapper
import AuthedTemplate from "Templates/Authed";

// Helpers
import { SITE_NAME } from "Helpers/constants";

// Components
import ProfileHead from "Components/ProfileHead";

// Styles
import * as s from "./style";

// Template
const PerfilTemplate = () => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(undefined);
  const [posts, setPosts] = useState(undefined);
  const [size, setSize] = useState(0);

  const postEl = useRef(null);

  const getData = useCallback(async () => {
    const findProfile = await UserAPI.getProfile(id);
    const findPosts = await FeedAPI.getFeed();

    if (findProfile) {
      setProfile(findProfile);
    }

    if (findPosts) {
      setPosts(findPosts);
    }

    setSize(postEl?.current?.offsetWidth);
  }, [id]);

  useEffect(() => {
    getData();
  }, [id, getData]);

  return (
    <AuthedTemplate>
      <Head>
        <title>
          {profile
            ? `Perfil de ${profile.name} (@${profile.url}) - ${SITE_NAME}`
            : `Perfil não encontrado - ${SITE_NAME}`}
        </title>
      </Head>

      {profile ? (
        <s.Container>
          <ProfileHead profile={profile} />

          <s.Tabs>
            <s.TabItem>Publicações</s.TabItem>
          </s.Tabs>

          {posts && (
            <s.PostsList>
              {posts.map((postItem) => {
                return (
                  <s.PostItem
                    key={`postitem-${postItem.id}`}
                    ref={postEl}
                    size={size}
                  >
                    <Link href={`/post/${postItem.id}`}>
                      <a>
                        <Image
                          src={postItem.image}
                          width={size}
                          height={size}
                        />
                      </a>
                    </Link>
                  </s.PostItem>
                );
              })}
            </s.PostsList>
          )}
        </s.Container>
      ) : (
        <>Não encontrado</>
      )}
    </AuthedTemplate>
  );
};

export default PerfilTemplate;
