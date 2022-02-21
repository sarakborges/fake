// Dependencies
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Template
const ProfilePicture = ({ avatar, size, isBlured }) => {
  return (
    <>
      {!avatar ? (
        <RoundIcon icon={faQuestion} size={size} bgColor='main' />
      ) : (
        <Avatar img={avatar} size={size} bgColor='main' isBlured={isBlured} />
      )}
    </>
  );
};

export default ProfilePicture;