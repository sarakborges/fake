import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const GroupBody = styled.div`
  display: flex;
  flex-flow: column;
  gap: 48px;

  padding: 0 32px;
`;

const CrownCss = css`
  display: flex;
  place-items: center;
  gap: 16px;
`;

export const Owner = styled.div`
  ${CrownCss}

  > svg {
    color: var(--golden);
  }
`;

export const Moderator = styled.div`
  ${CrownCss}

  > svg {
    color: var(--silver);
  }
`;
