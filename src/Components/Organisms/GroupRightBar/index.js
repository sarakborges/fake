// Helpers
import { ROUTES } from "Helpers/routes";

// Organisms
import RoundList from "Components/Organisms/RoundList";
import LinkList from "Components/Organisms/LinkList";

const GroupRightBar = ({ group }) => {
  return (
    <>
      <RoundList
        type='profile'
        title='Membros'
        list={group.members.slice(0, 5).map((item) => item.profile)}
        extraItemLink={ROUTES.GROUP_MEMBERS.MEMBERS.replace(":id", group.url)}
        displayMore={group?.members?.length > 5}
      />

      <RoundList
        type='group'
        title='Grupos relacionados'
        list={group?.relatedGroups?.slice?.(0, 5)}
        extraItemLink='#'
        hideEmpty
        displayMore={group?.relatedGroups?.length > 5}
      />

      <LinkList
        title='Links importantes'
        list={group?.importantLinks}
        hideEmpty
      />

      <LinkList title='Tags' list={group?.tags} hideEmpty />
    </>
  );
};

export default GroupRightBar;
