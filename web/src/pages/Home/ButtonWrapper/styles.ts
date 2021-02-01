import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
`;

interface ISelectButton {
  backgroundColor: string;
}

export const SelectButton = styled.div<ISelectButton>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    width: 90px;
    border-radius: 20px;
    background: ${props => props.backgroundColor};
    svg {
      color: #fff;
    }
  }
  small {
    margin-top: 15px;
    font-weight: 500;
  }
  &:nth-child(2n) {
    margin-left: 20px;
  }
  &:hover {
    div {
      background-color: ${props => darken(0.1, props.backgroundColor)};
    }
    small {
      font-weight: 900;
    }
  }
`;
