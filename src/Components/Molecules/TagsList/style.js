import styled from "styled-components";

export const TagsList = styled.span`
  display: flex;
  place-content: ${({ isCentered }) => (!isCentered ? "flex-start" : "center")};
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
`;
