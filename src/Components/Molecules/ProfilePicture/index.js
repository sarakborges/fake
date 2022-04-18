// Dependencies
import { faImage } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

const ProfilePicture = ({ avatar, size, isBlured }) => {
  return (
    <>
      {!avatar ? (
        <RoundIcon icon={faImage} size={size} bgColor='main' />
      ) : (
        <Avatar img={avatar} size={size} bgColor='main' isBlured={isBlured} />
      )}
    </>
  );
};

export default ProfilePicture;
