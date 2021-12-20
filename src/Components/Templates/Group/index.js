// Dependencies
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLink,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Organisms
import GroupHeader from "Components/Organisms/GroupHeader";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getGroup = useCallback(
    async (groupUrl) => {
      const groupData = await GroupAPI.getGroupByUrl(groupUrl);

      if (groupData) {
        setGroup(groupData);
      }
    },
    [GroupAPI]
  );

  useEffect(() => {
    getGroup(url);
  }, [url, getGroup]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"}`}</title>
      </Head>

      {group && (
        <>
          <GroupHeader group={group} />

          <S.GroupBody>
            <S.About>
              <div dangerouslySetInnerHTML={{ __html: group.about }} />
            </S.About>

            <S.RightBar>
              <div>
                <S.RightBarTitle>Membros</S.RightBarTitle>

                <S.BubbleList>
                  {group.members.slice(0, 5).map((item) => {
                    return (
                      <Link
                        key={item._id}
                        href={ROUTES.PROFILE.replace(":id", item.url)}
                      >
                        <a>
                          {item.avatar ? (
                            <Avatar img={item.avatar} size={40} />
                          ) : (
                            <RoundIcon
                              icon={faQuestion}
                              size={40}
                              bgColor='main'
                            />
                          )}
                        </a>
                      </Link>
                    );
                  })}

                  <Link
                    href={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
                      ":id",
                      group.url
                    )}
                  >
                    <a>
                      <RoundIcon icon={faEllipsisH} size={40} bgColor='main' />
                    </a>
                  </Link>
                </S.BubbleList>
              </div>

              {group.relatedGroups.length > 0 && (
                <div>
                  <S.RightBarTitle>Grupos relacionados</S.RightBarTitle>

                  <S.BubbleList>
                    {group.relatedGroups.slice(0, 5).map((item) => {
                      return (
                        <Link
                          key={item._id}
                          href={ROUTES.GROUP.replace(":id", item.url)}
                        >
                          <a>
                            <Avatar img={item.avatar} size={48} />
                          </a>
                        </Link>
                      );
                    })}
                  </S.BubbleList>
                </div>
              )}

              {group.importantLinks.length > 0 && (
                <div>
                  <S.RightBarTitle>Links importantes</S.RightBarTitle>

                  <S.TextList>
                    {group.importantLinks.map((item) => {
                      return (
                        <a key={item.title} href={item.link} target='_blank'>
                          <FontAwesomeIcon icon={faLink} />
                          <>{item.title}</>
                        </a>
                      );
                    })}
                  </S.TextList>
                </div>
              )}

              {group.tags.length > 0 && (
                <div>
                  <S.RightBarTitle>Tags</S.RightBarTitle>

                  <S.TextList>
                    {group.tags.map((item) => {
                      return (
                        <a
                          key={item}
                          href={`${ROUTES.GROUP.replace(
                            ":id",
                            group.url
                          )}/tags/${item}`}
                          target='_blank'
                        >
                          {item}
                        </a>
                      );
                    })}
                  </S.TextList>
                </div>
              )}
            </S.RightBar>
          </S.GroupBody>
        </>
      )}
    </AuthedTemplate>
  );
};

export default GroupTemplate;
