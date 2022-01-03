import UserAPI from "Apis/User";
import ProfileAPI from "Apis/Profile";

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
      userData = { ...localUserData, ...userReq };
    }
  } else {
    return false;
  }

  const profileData =
    userData.user.profiles?.length > 0
      ? userData.user.profiles.find(
          (item) => item._id === userData?.profile?._id
        ) || userData.user.profiles[0]
      : undefined;

  if (profileData?._id) {
    const profileReq = await ProfileAPI.getProfileById(profileData._id);

    return {
      user: { ...userData.user },
      profile: profileReq,
    };
  }

  return {
    user: { ...userData.user },
    profile: undefined,
  };
};
