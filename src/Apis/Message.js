import axios from "axios";

const getMessages = (users) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/messages/get`, { users })
    .then((res) => res.data)
    .catch((err) => err);
};

const getAllMessages = (user) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/messages/getAll`, { user })
    .then((res) => res.data)
    .catch((err) => err);
};

const sendMessage = (data) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/messages/new`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  getMessages,
  getAllMessages,
  sendMessage,
};
