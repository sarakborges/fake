import styled from "styled-components";

export const ProfileWrapper = styled.div`
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

export const ProfileContent = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  background-color: ${({ bg }) => (bg ? "var(--bgTransparent)" : "none")};
`;

export const ProfileBody = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const ProfileRight = styled.div`
  display: flex;
  flex-flow: column;

  position: sticky;
  top: 80px;
  right: 0;
  z-index: 1;

  max-height: calc(100vh - 72px);
  min-width: 400px;
  max-width: 400px;
  padding-top: 32px;

  background-color: var(--bgTransparent);
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-content: center;
  flex: 1;
  overflow: hidden;
`;

export const NoChatWrapper = styled.div`
  padding: 0 32px;
`;
