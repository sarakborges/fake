// Dependencies
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

// Style
import * as S from "./style";

const Tabs = ({ tabs }) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <S.Tabs>
      {tabs.map((item) => {
        return (
          <S.TabItem key={item.text} active={item.link === asPath}>
            <Link href={item.link}>
              <a>{item.text}</a>
            </Link>
          </S.TabItem>
        );
      })}
    </S.Tabs>
  );
};

export default Tabs;
