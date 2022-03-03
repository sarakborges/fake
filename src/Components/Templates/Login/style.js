import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-flow: column;
  place-content: center;
  place-items: center;

  min-height: 100vh;
  padding: 32px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 32px;

  width: 480px;
  max-width: 100%;
  padding: 32px;

  background-color: var(--bg);
  border-radius: 16px;
`;

export const RegisterLink = styled.p`
  text-align: center;
  font-size: 12px;
`;
