import styled from "styled-components";

export const Container = styled.div`
  max-width: 1170px;
  margin: auto;
  padding: 30px 0;
`;

export const Tabs = styled.div``;

export const TabItem = styled.div`
  padding: 0 15px;
  line-height: 40px;
  font-size: 20px;
`;

export const PostsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 45px;

  padding-top: 15px;
`;

export const PostItem = styled.div`
  position: relative;

  height: ${({ size }) => (size ? `${size}px` : "auto")};
  overflow: hidden;
`;
