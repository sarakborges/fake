// Dependencies
import { useReducer, createContext, useEffect, useCallback } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import ProfileAPI from "Apis/Profile";

// Reducers
import { ProfileReducer } from "Reducers/Profile";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const router = useRouter();
  const {
    query: { url },
  } = router;

  const [profileState, profileDispatch] = useReducer(ProfileReducer, undefined);

  const getProfile = useCallback(async () => {
    const profileReq = await ProfileAPI.getProfileByUrl(url);

    if (profileReq) {
      profileDispatch({
        type: "SET_PROFILE",
        data: profileReq,
      });
    }
  }, [url, ProfileAPI]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <ProfileContext.Provider value={{ profileState, profileDispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
