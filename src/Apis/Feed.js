const posts = [
  {
    id: 1,
    date: `2021-04-20 21:30:00`,
    text: `waifuzinea uwu`,
    image: `https://assets.puzzlefactory.pl/puzzle/258/817/original.jpg`,

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
];

const getFeed = () => {
  return posts;
};

export default { getFeed };
