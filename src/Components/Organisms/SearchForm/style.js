import styled from "styled-components";

export const Search = styled.div`
  flex: 1;

  position: relative;
`;

export const SearchResults = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 16px);
  z-index: 2;

  width: 600px;
  max-height: 440px;
  overflow: hidden auto;

  background-color: var(--bg);
  border-radius: 16px;
  box-shadow: 0 0 5px 3px var(--bgContrast);

  opacity: ${({ displayResults }) => (displayResults ? 1 : 0)};
  visibility: ${({ displayResults }) =>
    displayResults ? "visible" : "hidden"};

  transition: opacity 0.3s, visibility 0.3s;

  > div {
    > p {
      padding: 8px 16px;

      background-color: var(--main);

      color: var(--white);
      font-weight: 600;
    }
  }
`;
