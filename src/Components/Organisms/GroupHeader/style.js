import styled from "styled-components";

export const GroupCover = styled.div`
  width: 100%;
  height: 250px;

  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;
  border-radius: 32px 0 0 0;

  &:before {
    content: "";

    display: block;

    height: 100%;

    background-image: linear-gradient(transparent, var(--bgContrast));
  }
`;

export const GroupHead = styled.div`
  display: flex;
  place-items: center;
  place-content: space-between;

  position: sticky;
  left: 0;
  top: 0;
  z-index: 2;

  width: 100%;
  margin-bottom: 32px;
  padding: 16px 32px;

  border-bottom: 1px solid var(--bg);
  background-color: var(--bgContrast);
`;

export const GroupActions = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    > a {
      display: flex;
      place-content: center;
      place-items: center;

      font-size: 16px;

      background-color: var(--bg);
      border-radius: 8px;
    }

    > a,
    > button {
      width: 40px;
      height: 40px;
      padding: 0;
    }
  }
`;
