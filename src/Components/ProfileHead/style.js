import styled from "styled-components";

export const ProfileHead = styled.div`
  display: flex;
`;

export const HeadAvatar = styled.div`
  width: 150px;
  height: 150px;
  min-width: 150px;
  overflow: hidden;

  border-radius: 100%;
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  background-position: top center;
`;

export const HeadInfo = styled.div`
  flex: 1;
  max-width: calc(100% - 150px);
  padding-left: 30px;
`;

export const HeadTitle = styled.div`
  display: flex;
`;

export const HeadName = styled.div`
  flex: 1;

  font-size: 40px;
`;

export const HeadButtons = styled.div`
  display: flex;
`;

export const HeadAt = styled.div`
  padding-top: 20px;

  font-size: 20px;
`;

export const HeadStatus = styled.div`
  display: flex;

  padding-top: 30px;
`;

export const HeadStatusItem = styled.div`
  color: ${({ theme }) => theme.profile.header.status.fontColor};

  transition: color 0.3s;

  span {
    font-weight: 700;
    color: ${({ theme }) => theme.profile.header.status.highlightColor};

    transition: color 0.3s;
  }

  &:not(:first-child) {
    padding-left: 60px;
  }
`;

export const ProfileAbout = styled.div`
  padding: 30px 0;
  margin: 30px 0;

  border: 1px solid ${({ theme }) => theme.profile.lineColors};
  border-width: 1px 0;

  transition: border-color 0.3s;

  p {
    line-height: 160%;

    a {
      color: ${({ theme }) => theme.body.linkColor};
    }
  }
`;
