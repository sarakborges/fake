// Dependencies
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";
import Text from "Components/Atoms/Text";
import ButtonLink from "Components/Atoms/ButtonLink";

// Template
const InfoCard = ({ info, type, isBlured }) => {
  const { profileState } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [approvedConnections, setApprovedConnections] = useState([]);
  const [approvedMemberships, setApprovedMemberships] = useState([]);
  const [tags, setTags] = useState([]);

  const link = (type !== "group" ? ROUTES.PROFILE : ROUTES.GROUP).replace(
    ":id",
    info?.url
  );

  const getApprovedConnections = useCallback(() => {
    setApprovedConnections(
      info?.connections?.filter?.((item) => {
        if (item.status === "connected") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [info, setApprovedConnections]);

  const getApprovedMemberships = useCallback(() => {
    setApprovedMemberships(
      info?.groups?.filter?.((item) => {
        const member = item?.members?.find(
          (groupItem) => groupItem.profile === info?._id
        );

        if (member?.status === "member") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [info, setApprovedMemberships]);

  useEffect(() => {
    let newTags = [];

    if (info?.publicTags) {
      newTags = [...newTags, ...info?.publicTags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, []);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

  return (
    <S.InfoCard>
      <S.Cover img={info?.cover}>
        <S.InfoCardContent>
          <S.MainInfo>
            <S.InfoAreaWrapper>
              <Link href={link}>
                <a>
                  <InfoArea info={info} side='left' />
                </a>
              </Link>

              {profileState?._id === info?.owner && (
                <S.Owner>
                  <FontAwesomeIcon icon={faCrown} />
                </S.Owner>
              )}

              {info?.moderators?.include(profileState?._id) && (
                <S.Moderator>
                  <FontAwesomeIcon icon={faCrown} />
                </S.Moderator>
              )}
            </S.InfoAreaWrapper>

            {info?.members && (
              <Text type='custom' fs={14}>
                {info?.members.length}{" "}
                {info?.members.length !== 1 ? "participantes" : "participante"}
              </Text>
            )}

            {info?.connections && (
              <Text type='custom' fs={14}>
                {approvedConnections.length}{" "}
                {approvedConnections.length !== 1 ? "conexões" : "conexão"}
              </Text>
            )}

            {info?.groups && (
              <Text type='custom' fs={14}>
                {approvedMemberships.length}{" "}
                {approvedMemberships.length !== 1 ? "grupos" : "grupo"}
              </Text>
            )}

            <ButtonLink href={link}>
              Ver {type === "group" ? "grupo" : "perfil"}
            </ButtonLink>
          </S.MainInfo>

          {tags?.length > 0 && (
            <S.TagsList>
              {tags.map((item) => {
                return (
                  <Link key={item} href={ROUTES.SEARCH.replace(":str", item)}>
                    <a>
                      <S.TagItem
                        isCommon={
                          profile?.publicTags?.includes(item) ||
                          profile?.privateTags?.includes(item)
                        }
                      >
                        {item}
                      </S.TagItem>
                    </a>
                  </Link>
                );
              })}
            </S.TagsList>
          )}
        </S.InfoCardContent>
      </S.Cover>
    </S.InfoCard>
  );
};

export default InfoCard;
