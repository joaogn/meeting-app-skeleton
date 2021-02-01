import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  height: 100%;
  div {
    display: flex;
    align-items: center;
  }
`;

export const EndButton = styled.button`
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: #eb534b;
  color: white;
  &:hover {
    background: ${darken(0.1, '#eb534b')};
  }
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  width: 80px;
  color: #d2d2d2;
  &:hover {
    color: ${darken(0.2, '#d2d2d2')};
  }
`;

interface IRecordButton {
  isRecording: boolean;
}

export const RecordButton = styled.button<IRecordButton>`
  background: none;
  border: none;
  width: 80px;
  color: ${({ isRecording }) => (isRecording ? '#eb534b' : '#d2d2d2')};
  &:hover {
    color: ${({ isRecording }) =>
      isRecording ? darken(0.2, '#eb534b') : darken(0.2, '#d2d2d2')};
  }
`;
