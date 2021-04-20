import styled from "styled-components";

const size = "40px";

export const Container = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  height: ${size};
  padding: 15px;
`;

export const Avatar = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${size};
  height: ${size};
  overflow: hidden;

  border-radius: 100%;
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  background-position: top center;
  background-color: ${({ theme }) => theme.topBar.avatarBg};
`;

export const UserInfo = styled.div`
  padding-left: 15px;
`;

export const UserName = styled.div`
  line-height: 20px;
  font-size: 14px;
`;

export const UserLink = styled.div`
  line-height: 20px;
  font-size: 12px;

  a {
    color: ${({ theme }) => theme.topBar.linkColor};
  }
`;
