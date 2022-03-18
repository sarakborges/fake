// Dependencies
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";
import InfoArea from "Components/Molecules/InfoArea";

// Styles
import * as S from "./style";
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

const ForumList = ({ group }) => {
  return (
    <>
      {group?.forum?.length && (
        <>
          <Text type='custom' fw={400} pl={28} pt={8} pb={8} fs={20}>
            Fórum de {group?.name}:
          </Text>

          <S.Forum>
            {group?.forum?.map((item) => {
              return (
                <S.ForumItem key={item.categoryName}>
                  <S.Category>
                    {item.categoryIcon && (
                      <ProfilePicture avatar={item.categoryIcon} size={40} />
                    )}

                    <Text type='custom' fc='white' fw={400}>
                      {item.categoryName}
                    </Text>
                  </S.Category>

                  {item.subForums.map((subItem) => {
                    return (
                      <S.SubForumItem>
                        <S.SubForumHead>
                          <S.SubForumIcon>
                            <FontAwesomeIcon icon={faComment} />
                          </S.SubForumIcon>

                          <Text type='custom' fs={14}>
                            <Link href='#'>
                              <a>{subItem.threadName}</a>
                            </Link>
                          </Text>

                          <Text type='custom' fs={12}>
                            <>({subItem?.replies?.length} </>

                            <>
                              {subItem?.replies?.length === 1
                                ? "resposta"
                                : "respostas"}
                              )
                            </>
                          </Text>
                        </S.SubForumHead>

                        <S.SubForumInfo>
                          <div>
                            <Text type='custom' fs={12}>
                              <>Criado por </>

                              {getTimeString(subItem.createdAt, true)}

                              <> por:</>
                            </Text>

                            <S.InfoAreaWrapper>
                              <Link
                                href={ROUTES.PROFILE.replace(
                                  ":id",
                                  subItem.createdBy.url
                                )}
                              >
                                <a>
                                  <InfoArea
                                    info={subItem.createdBy}
                                    avatarSize={32}
                                    side='left'
                                  />
                                </a>
                              </Link>
                            </S.InfoAreaWrapper>
                          </div>

                          <div>
                            <Text type='custom' fs={12}>
                              <>Última resposta </>

                              {getTimeString(
                                [...subItem.replies].pop().createdAt,
                                true
                              )}

                              <> por:</>
                            </Text>

                            <S.InfoAreaWrapper>
                              <Link
                                href={ROUTES.PROFILE.replace(
                                  ":id",
                                  [...subItem.replies].pop().createdBy.url
                                )}
                              >
                                <a>
                                  <InfoArea
                                    info={[...subItem.replies].pop().createdBy}
                                    avatarSize={32}
                                    side='left'
                                  />
                                </a>
                              </Link>
                            </S.InfoAreaWrapper>

                            <Text type='custom' fs={12}>
                              <Link href='#'>
                                <a>Ir para última resposta</a>
                              </Link>
                            </Text>
                          </div>
                        </S.SubForumInfo>
                      </S.SubForumItem>
                    );
                  })}
                </S.ForumItem>
              );
            })}
          </S.Forum>
        </>
      )}
    </>
  );
};

export default ForumList;
