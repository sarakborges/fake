import axios from "axios";

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
  uploadFile,
};
