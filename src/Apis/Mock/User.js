import { profilesMock } from "Apis/Mock/Profile";

export const usersMock = [
  {
    email: "sarakborges@outlook.com",
    password: "123456",
    activeProfile: 1,
    profile: undefined,
    profiles: [...profilesMock],
  },
].map((item, key) => {
  return {
    id: key + 1,
    ...item,
  };
});
