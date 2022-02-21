// Dependencies
import { Fragment } from "react";
import Link from "next/link";

// Helpers
import { ROUTES } from "Helpers/routes";

// Atoms
import Tag from "Components/Atoms/Tag";

// Style
import * as S from "./style";

// Template
const TagsList = ({ tags, handleRemove, hasLink, highlighted, compareTo }) => {
  return (
    <S.TagsList tags={tags} handleRemove={!!handleRemove}>
      {tags.map((item) => {
        return (
          <Fragment key={item}>
            {hasLink ? (
              <Link href={ROUTES.SEARCH.replace(":str", item)}>
                <a>
                  <Tag
                    tag={item}
                    hasLink={hasLink}
                    handleRemove={!!handleRemove}
                    highlighted={highlighted || compareTo.includes(item)}
                  />
                </a>
              </Link>
            ) : (
              <Tag
                tag={item}
                hasLink={hasLink}
                handleRemove={!!handleRemove}
                highlighted={highlighted || compareTo.includes(item)}
              />
            )}
          </Fragment>
        );
      })}
    </S.TagsList>
  );
};

export default TagsList;
