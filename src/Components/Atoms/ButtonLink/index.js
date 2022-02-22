// Dependencies
import Link from "next/link";

// Style
import * as S from "./style";

const ButtonLink = ({ children, href }) => {
  return (
    <S.Button>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </S.Button>
  );
};

export default ButtonLink;
