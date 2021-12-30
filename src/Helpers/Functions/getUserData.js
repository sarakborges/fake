export const getUserData = () => {
  // localStorage.clear();
  const localData = localStorage.getItem("user");
  const localUserData = JSON.parse(localData);
  let userData;

  if (localUserData?.user) {
    userData = localUserData;
  } else {
    return false;
  }

  const profileData =
    userData.user.profiles.find(
      (item) => item._id === userData?.profile?._id
    ) || userData.user.profiles[0];

  return {
    user: { ...userData.user },
    profile: profileData,
  };
};
