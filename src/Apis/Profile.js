import axios from "axios";

const getProfileById = (id) => {
  if (!id) {
    console.log("getProfileById requires id param");
    return;
  }

  return axios
    .get(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/id/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

const getProfileByUrl = (url) => {
  if (!url) {
    console.log("getProfileByUrl requires url param");
    return;
  }

  return axios
    .get(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/url/${url}`)
    .then((res) => res.data)
    .catch((err) => err);
};

const createProfile = (data) => {
  if (!data) {
    console.log("createProfile requires data param");
    return;
  }

  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

const updateProfile = (data) => {
  if (!data) {
    console.log("updateProfile requires data param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

const deleteProfile = (data) => {
  if (!data) {
    console.log("deleteProfile requires data param");
    return;
  }

  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/delete`, { ...data })
    .then((res) => res.data)
    .catch((err) => err);
};

const updateConnection = (info) => {
  if (!info) {
    console.log("updateConnection requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/connection/update`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const blockProfile = (info) => {
  if (!info) {
    console.log("blockProfile requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/block`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const createConnection = (info) => {
  if (!info) {
    console.log("createConnection requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/connection/create`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const createPost = (info) => {
  if (!info) {
    console.log("createPost requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/feed/new`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  getProfileById,
  getProfileByUrl,
  createProfile,
  updateProfile,
  deleteProfile,
  updateConnection,
  createConnection,
  blockProfile,
  createPost,
};
