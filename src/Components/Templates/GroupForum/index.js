// Dependencies
import { useContext } from "react";

// Contexts
import { GroupContext } from "Contexts/Group";
import { UserContext } from "Contexts/User";

// Organisms
import ForumList from "Components/Organisms/ForumList";

// Templates
import GroupTemplate from "Components/Templates/Group";

const GroupAboutTemplate = () => {
  const { groupState } = useContext(GroupContext);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const forumList = [
    {
      categoryName: "Off",
      categoryIcon: `https://i.pinimg.com/originals/6d/e3/82/6de382b252688262955b3713cb12d302.png`,
      subForums: [
        {
          threadName: "Chat",
          url: "chat",
          createdBy: { ...profile },
          createdAt: new Date(),
          replies: [
            {
              createdBy: { ...profile },
              createdAt: new Date(),
              content: "aasdasd",
            },
          ],
        },

        {
          threadName: "Tópico de offs",
          url: "offs",
          createdBy: { ...profile },
          createdAt: new Date(),
          replies: [
            {
              createdBy: { ...profile },
              createdAt: new Date(),
              content: "aasdasd",
            },
          ],
        },
      ],
    },

    {
      categoryName: "Interpretativo",
      subForums: [
        {
          threadName: "Midnight Club",
          url: "mid-club",
          createdBy: { ...profile },
          createdAt: new Date(),
          replies: [
            {
              createdBy: { ...profile },
              createdAt: new Date(),
              content: "aasdasd",
            },
          ],
        },
      ],
    },
  ];

  return (
    <GroupTemplate>
      <ForumList group={{ ...groupState, forum: [...forumList] }} />
    </GroupTemplate>
  );
};

export default GroupAboutTemplate;
