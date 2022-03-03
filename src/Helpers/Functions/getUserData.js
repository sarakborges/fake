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
      userData = { ...userReq };
    }
  } else {
    return false;
  }

  const profileData =
    userData.profiles?.length > 0
      ? userData.profiles.find(
          (item) => item._id === localUserData?.profile?._id
        ) || userData.profiles[0]
      : undefined;

  const profileReq = profileData?._id
    ? await ProfileAPI.getProfileById(profileData?._id)
    : null;

  const ret = {
    user: { ...userData },
    profile: profileReq,
  };

  return ret;
};
