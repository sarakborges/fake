import styled from "styled-components";

export const Container = styled.div`
  padding: 30px 0;
`;

export const ProfileHead = styled.div`
  display: flex;
  place-content: center;

  max-width: 1170px;
  margin: auto;
`;

export const HeadAvatar = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;

  border-radius: 100%;
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  background-position: top center;
`;

export const HeadInfo = styled.div`
  flex: 1;
  padding-left: 30px;
`;

export const HeadTitle = styled.div`
  display: flex;
  place-items: center;
`;

export const HeadName = styled.div`
  flex: 1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 40px;
  line-height: 60px;
`;

export const HeadButtons = styled.div`
  display: flex;
`;

export const HeadAt = styled.div`
  padding-top: 10px;

  font-size: 20px;
`;

export const HeadStatus = styled.div`
  display: flex;

  padding-top: 30px;
`;

export const HeadStatusItem = styled.div`
  color: #ccc;

  span {
    font-weight: 700;
    color: #fff;
  }

  &:not(:first-child) {
    padding-left: 60px;
  }
`;
