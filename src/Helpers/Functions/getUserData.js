import UserAPI from "Apis/User";

export const getUserData = async () => {
  // localStorage.clear();
  const localData = localStorage.getItem("user");
  const localUserData = JSON.parse(localData);
  let userData;

  if (localUserData?.user) {
    const { email, password } = localUserData.user;
    const userReq = await UserAPI.getUser(email, password);

    if (!userReq?._id) {
      return false;
    } else {
      userData = { ...userReq, profile: { ...localUserData.profile } };
    }
  } else {
    return false;
  }

  const profileData =
    userData.profiles?.length > 0
      ? userData.profiles.find((item) => item._id === userData?.profile?._id) ||
        userData.profiles[0]
      : undefined;

  const ret = {
    user: { ...userData },
    profile: profileData,
  };

  return ret;
};
