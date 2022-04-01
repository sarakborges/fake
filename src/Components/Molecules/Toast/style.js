import styled from "styled-components";

export const Icon = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  max-width: 400px;
  height: 40px;
  aspect-ratio: 1;

  color: var(--white);

  border-radius: 16px;
  background-color: var(--main);
`;

export const Toast = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 999;

  display: flex;
  place-content: center;
  place-items: center;

  padding: 16px;
  overflow: hidden;
  gap: 16px;

  background-color: var(--bgContrast);
  box-shadow: 0 0 3px 3px var(--bg);
  border-radius: 4px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};

  transition: opacity 0.3s, visibility 0.3s;

  > button {
    height: 40px;
    aspect-ratio: 1;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;

  padding-right: 32px;

  color: var(--white);

  p {
    &:first-child {
      font-weight: 700;
    }
  }
`;
