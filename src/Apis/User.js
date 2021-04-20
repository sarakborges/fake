const profiles = [
  {
    id: 1,
    name: `Yogg'Sara`,
    url: `yoggsara`,
    avatar: `https://image.yoble.us/avatar/uma-bandeira-de-piratas5f85e540f1e3c.png`,
  },

  {
    id: 2,
    name: `Sara Hope`,
    url: `saritosa`,
    avatar: `http://image.yoble.us/avatar/auby6039390a61826.png`,
  },

  {
    id: 3,
    name: `Sara Borges`,
    url: `saraborges`,
    avatar: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-19/s150x150/167659584_261817525660233_2985348604899747948_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_ohc=zgLRIX048Q0AX9iqoc2&edm=ABfd0MgAAAAA&ccb=7-4&oh=f02116c1340dc00424c2fad1ffb9101b&oe=60A29A35&_nc_sid=7bff83`,
  },

  {
    id: 4,
    name: `Sophie Quines`,
    url: `blueishcupcake`,
    avatar: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-19/s150x150/167890027_1347210768997760_2363803177077584687_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_ohc=d5hO6c__mGMAX8RaKYQ&edm=ABfd0MgBAAAA&ccb=7-4&oh=38a74118d91201f96deae9f90a562b40&oe=60A5E173&_nc_sid=7bff83`,
  },
];

const users = [
  {
    id: 1,
    activeProfile: 3,
    profiles: [...profiles],
  },
];

const getUser = (id) => {
  if (users[id]) {
    return users[id];
  } else {
    return false;
  }
};

const getProfile = (url) => {
  const findProfile = profiles.find((profile) => profile.url === url);

  if (findProfile) {
    return findProfile;
  } else {
    return false;
  }
};

export default { getUser, getProfile };
