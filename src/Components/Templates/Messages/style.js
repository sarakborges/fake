import styled from "styled-components";

export const MessagesWrapper = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 100%;
`;

export const PeopleWrapper = styled.div`
  display: flex;
  flex-flow: column;

  width: 400px;
`;

export const PeopleList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;

  width: 100%;
  overflow: hidden;
  overflow-y: auto;
`;

export const PersonWrapper = styled.span`
  display: flex;
  place-items: center;
  gap: 24px;

  width: 100%;
  padding: 16px;

  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "var(--bg)" : "transparent"};

  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bg);
  }
`;

export const PeopleFilter = styled.div`
  display: flex;
  place-items: center;

  padding: 0 16px;
  height: 100px;

  background-color: var(--bg);
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  border-left: 2px solid var(--bg);
`;

export const SenderHeader = styled.div`
  display: flex;
  place-items: center;
  gap: 24px;

  padding: 0 24px;
  height: 100px;

  position: relative;

  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;

  &:before {
    content: "";

    display: block;

    width: 100%;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;

    background-image: ${({ img }) =>
      img
        ? `linear-gradient(transparent, var(--bgContrast))`
        : `linear-gradient(var(--bg), var(--bgContrast))`};
  }

  > :is(div, span) {
    position: relative;
    z-index: 2;
  }

  > span {
    box-shadow: 2px 2px 3px var(--bgContrast);
  }

  p {
    text-shadow: 2px 2px 3px var(--bgContrast);
  }
`;

export const MessagesList = styled.ul`
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 24px;

  padding: 32px 24px 24px;
`;

export const MessageItem = styled.li`
  display: flex;
  place-items: center;
  flex-flow: ${({ isSelf }) => (isSelf ? "row-reverse" : "row")};
  gap: 16px;

  > p {
    padding: 8px 12px;

    color: var(--white);

    border-radius: 8px;
    background-color: ${({ isSelf }) => (isSelf ? "var(--main)" : "var(--bg)")};
  }
`;

export const NewMessage = styled.div`
  display: flex;
  place-items: flex-end;
  gap: 32px;

  padding: 16px 16px 24px;

  border-top: 2px solid var(--bg);
`;
