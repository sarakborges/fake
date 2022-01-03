import styled from "styled-components";

export const InfoCover = styled.div`
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

export const InfoHead = styled.div`
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

  background-color: var(--bgContrast);
`;

export const InfoInfo = styled.div`
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

export const InfoActions = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;

  > div {
    display: flex;
    place-content: center;
    place-items: center;

    position: relative;

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

export const ActionTitle = styled.p`
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  z-index: 3;

  padding: 8px;

  background-color: var(--main);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;

  color: var(--white);
  font-size: 12px;
  white-space: nowrap;

  transition: opacity 0.3s, visibility 0.3s;

  ${InfoActions} > div:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
