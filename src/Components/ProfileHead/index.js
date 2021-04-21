// Dependencies
import React, { Fragment, useContext } from "react";
import Link from "next/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Components
import Button from "Components/Form/Button";

// Styles
import * as s from "./style";

// Component
const ProfileHead = ({ profile }) => {
  const { appState } = useContext(AppContext);
  const { theme } = appState;

  const { userState } = useContext(UserContext);
  const { user } = userState;

  const headButtonStyle = {
    padding: "0 15px",
    marginLeft: "10px",
    height: "40px",
    backgroundColor: theme.profile.header.buttons.bgColor,
    borderRadius: "7px",
    border: `1px solid ${theme.profile.header.buttons.borderColor}`,
    color: theme.profile.header.buttons.fontColor,
  };

  const headButtonHoverStyle = {
    backgroundColor: theme.profile.header.buttons.hover.bgColor,
  };

  return (
    <>
      <s.ProfileHead>
        <s.HeadAvatar avatar={profile.avatar} />

        <s.HeadInfo>
          <s.HeadTitle>
            <s.HeadName>{profile.name}</s.HeadName>

            {profile.id !== user.activeProfile && (
              <s.HeadButtons>
                <Button
                  customStyle={headButtonStyle}
                  customHoverStyle={headButtonHoverStyle}
                >
                  Enviar mensagem
                </Button>

                <Button
                  customStyle={headButtonStyle}
                  customHoverStyle={headButtonHoverStyle}
                >
                  Seguir
                </Button>

                <Button
                  customStyle={{ ...headButtonStyle, fontSize: "20px" }}
                  customHoverStyle={headButtonHoverStyle}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </s.HeadButtons>
            )}
          </s.HeadTitle>

          <s.HeadAt>@{profile.url}</s.HeadAt>

          <s.HeadStatus>
            <s.HeadStatusItem>
              <span>{Math.floor(Math.random() * 10000)}</span> publicações
            </s.HeadStatusItem>

            <s.HeadStatusItem>
              <span>{Math.floor(Math.random() * 10000)}</span> seguidores
            </s.HeadStatusItem>

            <s.HeadStatusItem>
              <span>{Math.floor(Math.random() * 10000)}</span> seguindo
            </s.HeadStatusItem>
          </s.HeadStatus>
        </s.HeadInfo>
      </s.ProfileHead>

      <s.ProfileAbout>
        {profile.about.split("\n").map((splitItem) => {
          const splitItemAt = /@[A-z]*/.exec(splitItem);

          if (splitItemAt) {
            return (
              <p key={`splitword-${splitItemAt}`}>
                {splitItemAt.map((splitItemPiece) => {
                  return (
                    <Fragment
                      key={`splitword-${splitItemAt}-${splitItemPiece}`}
                    >
                      {splitItem.replace(splitItemPiece, "")}
                      <Link
                        href={`${ROUTES.PROFILE}${splitItemPiece.substr(
                          1,
                          splitItemPiece.length - 1
                        )}`}
                      >
                        <a>{splitItemPiece}</a>
                      </Link>
                    </Fragment>
                  );
                })}
              </p>
            );
          }

          return <p key={`split-${splitItem}`}>{splitItem || <br />}</p>;
        })}
      </s.ProfileAbout>
    </>
  );
};

export default ProfileHead;
