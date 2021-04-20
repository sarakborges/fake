import styled from "styled-components";

const size = "50px";
const iconSize = "26px";

export const Container = styled.div`
  display: flex;

  height: ${({ theme }) => theme.alertBar.size};

  background-color: ${({ theme, type }) =>
    type === "success"
      ? theme.alertBar.success.bgColor
      : type === "warning"
      ? theme.alertBar.warning.bgColor
      : theme.alertBar.error.bgColor};

  color: ${({ theme }) => theme.alertBar.fontColor};
`;

export const IconWrapper = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${size};
  height: ${size};

  svg {
    width: ${iconSize} !important;
    height: ${iconSize} !important;
  }
`;

export const CloseWrapper = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  width: ${size};
  height: ${size};

  svg {
    width: ${iconSize} !important;
    height: ${iconSize} !important;
  }

  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffffff40;
  }
`;

export const TextWrapper = styled.div`
  flex: 1;

  padding: 0 10px;
  overflow: hidden;

  line-height: ${size};
  text-align: center;
  font-size: 20px;
`;
