const profiles = [
  {
    id: 1,
    name: `Yogg'Sara`,
    url: `yoggsaranimu`,
    about: `Nada pessoal. Só não quero aceitar ninguém.
    Mas aproveita que os recados tão abertos.`,
    avatar: `https://image.yoble.us/avatar/uma-bandeira-de-piratas5f85e540f1e3c.png`,
  },

  {
    id: 2,
    name: `Sara Hope`,
    url: `saritosa`,
    about: `Esse meu perfil é feito basicamente para conversar. Eventualmente, para flertar. Mas, dificilmente turnar.

    Para quem interessar, eu sou uma mina trans. É isso.`,
    avatar: `http://image.yoble.us/avatar/auby6039390a61826.png`,
  },

  {
    id: 3,
    name: `Sara Borges`,
    url: `yoggsara`,
    about: `⏳ 28yo.
    🦄 Tgirl.
    💊 HRT since 16/09/2020.
    🔧 Front-end web engineer.
    💘 @blueishcupcake`,
    avatar: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-19/s150x150/167659584_261817525660233_2985348604899747948_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_ohc=zgLRIX048Q0AX9iqoc2&edm=ABfd0MgAAAAA&ccb=7-4&oh=f02116c1340dc00424c2fad1ffb9101b&oe=60A29A35&_nc_sid=7bff83`,
  },

  {
    id: 4,
    name: `Sophie Quines`,
    url: `blueishcupcake`,
    about: `❄️ 21 Winters.
    🦄 Trans woman.
    🌺 She/They.
    💻 Front end developer.
    💘 @yoggsara`,
    avatar: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-19/s150x150/167890027_1347210768997760_2363803177077584687_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_ohc=d5hO6c__mGMAX8RaKYQ&edm=ABfd0MgBAAAA&ccb=7-4&oh=38a74118d91201f96deae9f90a562b40&oe=60A5E173&_nc_sid=7bff83`,
  },

  {
    id: 5,
    name: `a melhor bb de todas com o nome mais longo dessa porra`,
    url: `blueishcupcake1`,
    about: `❄️ 21 Winters.
    🦄 Trans woman.
    🌺 She/They.
    💻 Front end developer.
    💘 @yoggsara`,
    avatar: `https://cdn.discordapp.com/avatars/199676502722347009/6d71ad20497fd5beb943fc7a615887e2.png?size=1024`,
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
