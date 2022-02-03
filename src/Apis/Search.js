import axios from "axios";

const searchByStr = (str) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_REQUEST_URI}/search/str/${str}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export default {
  searchByStr,
};
