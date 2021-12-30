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

  const formData = new FormData();

  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return axios
    .post(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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

const deleteProfile = (id) => {
  if (!id) {
    console.log("deleteProfile requires id param");
    return;
  }

  return axios
    .delete(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/${id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  getProfileById,
  getProfileByUrl,
  createProfile,
  updateProfile,
  deleteProfile,
};
