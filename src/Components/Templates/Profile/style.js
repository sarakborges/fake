import styled from "styled-components";

export const ProfileBody = styled.div`
  display: flex;
`;

export const About = styled.div`
  flex: 1;
  margin: 32px;
  overflow: hidden;

  img {
    max-width: 100%;
  }
`;

export const RightBar = styled.div`
  display: flex;
  flex-flow: column;
  place-items: flex-end;
  gap: 48px;

  width: 336px;
  margin: 0 16px;

  > div {
    width: 100%;
    padding: 16px 2px;

    background-color: var(--bg);
    border-radius: 16px;
  }
`;

export const RightBarNoItems = styled.div`
  padding-top: 16px;

  text-align: center;
`;

export const RightBarTitle = styled.div`
  text-align: center;
  color: var(--main);
`;

export const BubbleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  padding: 24px 16px 0;

  > a {
    display: flex;
  }
`;

export const TextList = styled.div`
  display: flex;
  flex-wrap: wrap;
  place-content: center;

  padding: 16px 16px 0;

  > a {
    display: flex;
    place-items: center;

    height: 32px;
    padding: 0 8px;
    margin: 4px;

    border-radius: 8px;
    background-color: var(--bg);

    font-size: 14px;

    > svg {
      margin-right: 8px;
    }
  }
`;
