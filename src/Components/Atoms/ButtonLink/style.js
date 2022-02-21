import styled from "styled-components";

export const Button = styled.div`
  > a {
    display: flex;
    place-items: center;
    place-content: center;
    gap: 8px;

    height: 36px;
    padding: 0 12px;

    border: 2px solid var(--main);
    background-color: var(--main);
    border-radius: 4px;
    box-shadow: 2px 2px 3px var(--bg);
    cursor: pointer;

    font-size: 12px;
    font-family: inherit;
    color: var(--white);

    transition: background-color 0.3s, color 0.3s, opacity 0.3s;

    &:hover {
      background-color: var(--bgContrast);

      color: var(--main);
    }
  }
`;
