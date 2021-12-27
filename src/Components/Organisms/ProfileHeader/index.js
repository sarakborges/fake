// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// Helpers
import { ROUTES } from "Helpers/routes";
import { PROFILE_ACTIONS } from "Helpers/Constants";

// Atoms
import Button from "Components/Atoms/Button";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

const ProfileHeader = ({ profile }) => {
  return (
    <>
      {profile.cover && <S.ProfileCover img={profile.cover} />}

      <S.ProfileHead>
        <Link href={ROUTES.GROUP.replace(":id", profile.url)}>
          <a>
            <InfoArea info={profile} side='left' />
          </a>
        </Link>

        <S.ProfileActions>
          {PROFILE_ACTIONS.map((item) => {
            return (
              <div key={item.id}>
                <Link href={item.to.replace(":id", profile.url)}>
                  <a>
                    <FontAwesomeIcon icon={item.icon} />
                  </a>
                </Link>
              </div>
            );
          })}
        </S.ProfileActions>
      </S.ProfileHead>
    </>
  );
};

export default ProfileHeader;
