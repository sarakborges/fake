// Dependencies
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

// Helpers
import { PROFILE_HEADER, GROUP_HEADER } from "Helpers/Constants";
import { isLinkActive } from "Helpers/Functions";

// Style
import * as S from "./style";

const InfoLinks = ({ info, type }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <S.Sections>
      {(type === "group" ? GROUP_HEADER : PROFILE_HEADER).SECTIONS.map(
        (item) => {
          return (
            <S.SectionLink key={item.id} active={isLinkActive(item, pathname)}>
              <Link href={item.to.replace(":id", info.url)}>
                <a>{item.title}</a>
              </Link>
            </S.SectionLink>
          );
        }
      )}
    </S.Sections>
  );
};

export default InfoLinks;
