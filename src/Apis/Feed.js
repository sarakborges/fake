const posts = [
  {
    id: 1,
    date: `2021-04-20 21:30:00`,
    text: `waifuzinea uwu`,
    image: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-15/e35/165973181_296409011835831_256141292510103874_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=9SJF0A5wI64AX8K_M_p&edm=AP_V10EBAAAA&ccb=7-4&oh=865c7cc4a589f4cf2eea8009dfbc8d6f&oe=60A5DA77&_nc_sid=4f375e`,

    user: {
      id: 1,
      name: `Yogg'Sara`,
      url: `yoggsara`,
      avatar: `https://image.yoble.us/avatar/uma-bandeira-de-piratas5f85e540f1e3c.png`,
    },

    comments: [
      {
        id: 1,
        text: `ai q linda`,

        user: {
          id: 2,
          name: `Sara Hope`,
          url: `saritosa`,
          avatar: `http://image.yoble.us/avatar/auby6039390a61826.png`,
        },
      },
    ],
  },

  {
    id: 2,
    date: `2021-04-20 21:30:00`,
    text: `waifuzinea uwu`,
    image: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-15/e35/147087834_135046951799250_5475524982372495352_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=DPSvQT_y90kAX8NV70E&edm=AP_V10EBAAAA&ccb=7-4&oh=6b1b4d1dbc0a86311bc78cd4f6e8cddb&oe=60A49103&_nc_sid=4f375e`,

    user: {
      id: 1,
      name: `Yogg'Sara`,
      url: `yoggsara`,
      avatar: `https://image.yoble.us/avatar/uma-bandeira-de-piratas5f85e540f1e3c.png`,
    },

    comments: [],
  },

  {
    id: 3,
    date: `2021-04-20 21:30:00`,
    text: `waifuzinea uwu`,
    image: `https://instagram.fpoa13-1.fna.fbcdn.net/v/t51.2885-15/e35/141213124_683633898975450_2624257235711378603_n.jpg?tp=1&_nc_ht=instagram.fpoa13-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=gsJzVfZ50RoAX9XCcXH&edm=AP_V10EBAAAA&ccb=7-4&oh=4a4deafb92a33becc7072f68be2e32a5&oe=60A5BF27&_nc_sid=4f375e`,

    user: {
      id: 1,
      name: `Yogg'Sara`,
      url: `yoggsara`,
      avatar: `https://image.yoble.us/avatar/uma-bandeira-de-piratas5f85e540f1e3c.png`,
    },

    comments: [],
  },
];

const getFeed = () => {
  return posts;
};

export default { getFeed };
