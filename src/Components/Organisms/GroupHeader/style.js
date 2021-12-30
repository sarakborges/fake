import styled from "styled-components";

export const GroupCover = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center center;

  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;

  &:before {
    content: "";

    display: block;

    height: 100%;

    background-image: ${({ img }) =>
      img
        ? `linear-gradient(transparent, var(--bgContrast))`
        : `linear-gradient(transparent, var(--bg))`};
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
  padding: 32px;

  border-bottom: 1px solid var(--bg);
  background-color: var(--bgContrast);
`;

export const GroupInfo = styled.div`
  display: flex;
  gap: 32px;
  place-items: center;

  flex: 1;
  max-width: calc(100% - 152px);
  padding-right: 32px;

  > div {
    display: flex;
    flex-flow: column;
    gap: 8px;

    text-shadow: 2px 2px 3px var(--bgContrast);
    color: var(--white);

    a {
      color: var(--mainVariation);
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
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
      color: var(--white);

      border: 1px solid var(--main);
      background-color: var(--main);
      border-radius: 8px;

      transition: background-color 0.3s, color 0.3s;

      &:hover {
        color: var(--main);

        background-color: var(--white);
      }
    }

    > a,
    > button {
      width: 40px;
      height: 40px;
      padding: 0;

      box-shadow: 2px 2px 3px var(--bgContrast);
    }
  }
`;
