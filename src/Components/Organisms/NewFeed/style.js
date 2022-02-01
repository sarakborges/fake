import styled from "styled-components";

export const NewFeed = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;

  > textarea {
    border: 0;
    border-radius: 16px;
  }
`;

export const PublishFeed = styled.div`
  display: flex;
  place-content: flex-end;
  gap: 16px;
`;
