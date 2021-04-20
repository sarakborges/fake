const users = [
  {
    id: 1,
    activeProfile: 3,
    profiles: [
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
    ],
  },
];

const getUser = (id) => {
  if (users[id]) {
    return users[id];
  } else {
    return false;
  }
};

export default { getUser };
