import axios from "axios";

const getGroupById = (id) => {
  if (!id) {
    console.log("getGroupById requires url param");
    return;
  }

  return axios
    .get(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group/id/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

const getGroupByUrl = (url) => {
  if (!url) {
    console.log("getGroupByUrl requires url param");
    return;
  }

  return axios
    .get(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group/url/${url}`)
    .then((res) => res.data)
    .catch((err) => err);
};

const createGroup = (data) => {
  if (!data) {
    console.log("createGroup requires data param");
    return;
  }

  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

const updateGroup = (data) => {
  if (!data) {
    console.log("updateGroup requires data param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

const joinGroup = (info) => {
  if (!info) {
    console.log("joinGroup requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group/join`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const leaveGroup = (info) => {
  if (!info) {
    console.log("leaveGroup requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/group/leave`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  getGroupById,
  getGroupByUrl,
  createGroup,
  updateGroup,
  joinGroup,
  leaveGroup,
};
