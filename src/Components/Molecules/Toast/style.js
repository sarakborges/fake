import styled from "styled-components";

const colors = {
  success: "var(--green)",
  warning: "var(--yellow)",
  error: "var(--red)",
};

export const Icon = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  max-width: 400px;
  height: 32px;
  aspect-ratio: 1;

  font-size: 16px;
  color: var(--offWhite);

  border-radius: 8px;
`;

export const Toast = styled.div`
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: 999;

  display: flex;
  place-content: center;
  place-items: center;

  padding: 16px;
  overflow: hidden;
  gap: 16px;

  background-color: var(--bgContrast);
  box-shadow: 0 0 3px 3px var(--bg);
  border-radius: 16px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};

  transition: opacity 0.3s, visibility 0.3s;

  > button {
    height: 40px;
    aspect-ratio: 1;
  }

  & ${Icon} {
    background-color: ${({ type }) => colors[type]};
  }
`;

export const Text = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;

  p {
    &:first-child {
      font-weight: 700;
    }
  }
`;
