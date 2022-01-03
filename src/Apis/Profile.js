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

const deleteConnection = (info) => {
  if (!info) {
    console.log("deleteConnection requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/connection/refuse`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const acceptConnection = (info) => {
  if (!info) {
    console.log("acceptConnection requires info param");
    return;
  }

  return axios
    .put(`${process.env.NEXT_PUBLIC_REQUEST_URI}/profile/connection/accept`, {
      ...info,
    })
    .then((res) => res.data)
    .catch((err) => err);
};

const uploadFile = (avatar) => {
  const formData = new FormData();
  formData.append("image", avatar);

  return axios
    .post(
      "https://api.imgbb.com/1/upload?key=f268fffd080754b05f5498a1a56d7da2",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data)
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  getProfileById,
  getProfileByUrl,
  createProfile,
  updateProfile,
  deleteProfile,
  deleteConnection,
  acceptConnection,
  uploadFile,
};
