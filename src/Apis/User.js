import axios from "axios";

const getUser = (email, password) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/user/get`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const createUser = (email, password) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/user/new`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const updateUser = (data) => {
  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/user`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

export default { getUser, createUser, updateUser };
