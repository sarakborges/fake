import styled from "styled-components";

export const Cover = styled.div`
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

export const Head = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;

  position: sticky;
  left: 0;
  top: 0;
  z-index: 2;

  width: 100%;
  margin-bottom: 32px;
  padding: 32px;
  overflow: hidden;

  background-color: var(--bgContrast);
  border-radius: 32px 0 0 0;
`;

export const Center = styled.div`
  flex: 1;
`;

export const Info = styled.div`
  display: flex;
  gap: 32px;

  flex: 1;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;

  text-shadow: 2px 2px 3px var(--bgContrast);
  color: var(--white);

  a {
    color: var(--mainVariation);
    font-size: 12px;
  }
`;

export const Avatar = styled.div`
  display: flex;

  > span {
    box-shadow: 2px 2px 3px var(--bgContrast);
  }
`;

export const Actions = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    position: relative;

    > a {
      display: flex;
      place-content: center;
      place-items: center;
      gap: 8px;

      height: 48px;

      font-size: 16px;
      color: var(--white);

      border: 2px solid var(--main);
      background-color: var(--main);
      border-radius: 4px;

      transition: background-color 0.3s, color 0.3s;

      &:hover {
        color: var(--main);

        background-color: var(--white);
      }
    }

    > a,
    > button {
      padding: 12px;

      box-shadow: 2px 2px 3px var(--bgContrast);
    }
  }
`;
