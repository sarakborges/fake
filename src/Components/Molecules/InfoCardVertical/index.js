// Dependencies
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Text from "Components/Atoms/Text";
import ButtonLink from "Components/Atoms/ButtonLink";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";
import TagsList from "Components/Molecules/TagsList";

// Style
import * as S from "./style";

// Template
const InfoCard = ({ info, type, isBlured, parentInfo }) => {
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
        if (item.status === "member") {
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

              {((info?.owner && parentInfo?._id === info?.owner) ||
                parentInfo?.owner === info?._id) && (
                <S.Owner>
                  <FontAwesomeIcon icon={faCrown} />
                </S.Owner>
              )}

              {((info?.moderators &&
                info?.moderators?.include(parentInfo?._id)) ||
                (parentInfo?.moderators &&
                  parentInfo?.moderators?.include(info?._id))) && (
                <S.Moderator>
                  <FontAwesomeIcon icon={faCrown} />
                </S.Moderator>
              )}
            </S.InfoAreaWrapper>

            {type === "group" && (
              <Text type='custom' fs={14}>
                Possui {info?.members?.length}{" "}
                {info?.members?.length !== 1 ? "participantes" : "participante"}
              </Text>
            )}

            {type !== "group" && (
              <Text type='custom' fs={14}>
                Possui {approvedConnections?.length}{" "}
                {approvedConnections?.length !== 1 ? "conexões" : "conexão"}
              </Text>
            )}

            {type !== "group" && (
              <Text type='custom' fs={14}>
                Participa de {approvedMemberships?.length}{" "}
                {approvedMemberships?.length !== 1 ? "grupos" : "grupo"}
              </Text>
            )}

            <ButtonLink href={link}>
              Ver {type === "group" ? "grupo" : "perfil"}
            </ButtonLink>
          </S.MainInfo>

          {tags?.length > 0 && (
            <S.Tags>
              <TagsList
                tags={tags}
                hasLink
                compareTo={[
                  ...(profile?.publicTags || []),
                  ...(profile?.privateTags || []),
                ]}
              />
            </S.Tags>
          )}
        </S.InfoCardContent>
      </S.Cover>
    </S.InfoCard>
  );
};

export default InfoCard;
