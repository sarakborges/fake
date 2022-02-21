import styled from "styled-components";

export const GroupWrapper = styled.div`
  display: flex;
  flex-flow: column;

  width: 100%;
  flex: 1;

  background-color: var(--bgContrast);
  background-image: url(${({ bg }) => bg});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

export const GroupContent = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  background-color: ${({ bg }) => (bg ? "var(--bgTransparent)" : "none")};
`;

export const GroupBody = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
`;

export const GroupLeft = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  padding: 0 24px 24px;
`;
