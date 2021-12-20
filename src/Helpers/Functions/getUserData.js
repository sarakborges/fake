export const getUserData = () => {
  // sessionStorage.clear();
  const localData = sessionStorage.getItem("user");
  const localUserData = JSON.parse(localData);
  let userData;

  if (localUserData?.user) {
    userData = localUserData.user;
  } else {
    return false;
  }

  const profileData =
    userData.profiles.find((item) => item._id === userData?.profile?._id) ||
    userData.profiles[0];

  return {
    user: { ...userData },
    profile: profileData,
  };
};
