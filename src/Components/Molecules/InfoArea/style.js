import styled from "styled-components";

export const InfoArea = styled.span`
  display: flex;
  place-items: center;
  gap: 16px;
`;

export const Text = styled.span`
  display: flex;
  place-content: center;
  flex-flow: column;

  max-width: calc(100% - 64px);
  height: 64px;
  flex: 1;
`;

export const Name = styled.span`
  width: 100%;
  overflow: hidden;

  line-height: 32px;
  font-size: 20px;
  color: var(--main);

  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Url = styled.span`
  width: 100%;
  overflow: hidden;

  line-height: 32px;
  font-size: 16px;
  color: var(--bgInverted);

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InfoAreaBox = styled.div`
  padding: 16px;

  background-color: var(--bg);
  border-radius: 16px;
  box-shadow: ${({ highlighted }) =>
    highlighted ? "0 0 5px -1px var(--main)" : "0 0 3px 3px var(--bg);"};
  cursor: ${({ highlighted }) => (highlighted ? "default" : "pointer")};

  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ highlighted }) =>
      !highlighted ? "var(--bgContrast)" : "var(--bg)"};
  }
`;
