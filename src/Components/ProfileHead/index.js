// Dependencies
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Components
import Button from "Components/Form/Button";

// Styles
import * as s from "./style";

// Component
const ProfileHead = ({ profile }) => {
  const headButtonStyle = {
    padding: "0 15px",
    marginLeft: "15px",
    height: "40px",
  };

  return (
    <>
      <s.ProfileHead>
        <s.HeadAvatar avatar={profile.avatar} />

        <s.HeadInfo>
          <s.HeadTitle>
            <s.HeadName>{profile.name}</s.HeadName>

            <s.HeadButtons>
              <Button customStyle={headButtonStyle}>Enviar mensagem</Button>
              <Button customStyle={headButtonStyle}>Seguir</Button>
              <Button customStyle={headButtonStyle}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Button>
            </s.HeadButtons>
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
              <p>
                {splitItemAt.map((splitItemPiece) => {
                  return (
                    <>
                      {splitItem.replace(splitItemPiece, "")}
                      <Link
                        href={`${ROUTES.PROFILE}${splitItemPiece.substr(
                          1,
                          splitItemPiece.length - 1
                        )}`}
                      >
                        <a>{splitItemPiece}</a>
                      </Link>
                    </>
                  );
                })}
              </p>
            );
          }

          return <p>{splitItem || <br />}</p>;
        })}
      </s.ProfileAbout>
    </>
  );
};

export default ProfileHead;
