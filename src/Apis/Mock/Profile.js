export const profilesMock = [
  {
    name: `yogg'sara`,
    url: `a-sara`,
    avatar: `https://image.yoble.us/avatar/a-sara61aa5699b291d.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    groups: [1, 2, 3],
    about: ``,
  },

  {
    name: `ruined pirate`,
    url: `sara-pirata`,
    avatar: `https://image.yoble.us/avatar/sara-pirata61afc20663d42.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1, 3, 4],
    groups: [1],
    about: ``,
  },

  {
    name: `charming kpoper`,
    url: `kurama-no-lol`,
    avatar: `https://image.yoble.us/avatar/kurama-no-lol61afc1a196f00.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1, 4],
    groups: [1],
    about: ``,
  },

  {
    name: `black magic woman`,
    url: `caw-caw-caw`,
    avatar: `https://image.yoble.us/avatar/caw-caw-caw61b0b9e266142.png`,
    isAdult: false,
    createdAt: `21/04/2021`,
    connections: [1, 3],
    groups: [1],
    about: ``,
  },

  {
    name: `hero uravity`,
    url: `seu-mundinho`,
    avatar: `https://image.yoble.us/avatar/seu-mundinho61b0b29c7792d.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1, 3, 4],
    groups: [1],
    about: ``,
  },

  {
    name: `spirit soother`,
    url: `tipo-stand-user`,
    avatar: `https://image.yoble.us/avatar/tipo-stand-user61afc2894bfb7.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1, 3, 4],
    groups: [1],
    about: ``,
  },

  {
    name: `explosions go boom`,
    url: `i-wanna-go-boom-boom`,
    avatar: `https://image.yoble.us/avatar/i-wanna-go-boom-boom61afc13b8f720.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `lightning strike`,
    url: `sara-eletrica`,
    avatar: `https://image.yoble.us/avatar/sara-eletrica611d1c709c047.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `former loki`,
    url: `a-loka`,
    avatar: `https://image.yoble.us/avatar/a-loka616084a8c9889.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `fallen angel`,
    url: `dark-side-of-moon`,
    avatar: `https://image.yoble.us/avatar/dark-side-of-moon60845f4b3bbb5.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `ghost spider`,
    url: `spodegwen`,
    avatar: `https://image.yoble.us/avatar/spodegwen5f44087de6953.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `the rogue kpoper`,
    url: `em-nome-do-kpop`,
    avatar: `https://image.yoble.us/avatar/em-nome-do-kpop60ae7a4c40774.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `executioner model`,
    url: `matar-meu-bb-repetidamente`,
    avatar: `https://image.yoble.us/avatar/matar-meu-bb-repetidamente60ac4bf9d50b1.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `the ultimate spear`,
    url: `lust-maos-de-tesoura`,
    avatar: `https://image.yoble.us/avatar/lust-maos-de-tesoura5f4406f793963.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },

  {
    name: `a drow, of course`,
    url: `faz-de-conta-que-sou-uma-drow`,
    avatar: `https://image.yoble.us/avatar/faz-de-conta-que-sou-uma-drow6131000381700.png`,
    createdAt: `21/04/2021`,
    isAdult: false,
    connections: [1],
    groups: [1],
    about: ``,
  },
].map((item, key) => {
  return {
    id: key + 1,
    ...item,
  };
});
