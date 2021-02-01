import React from 'react';
import { MdVideocam, MdAddBox, MdToday, MdScreenShare } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { Container, SelectButton } from './styles';
import generateRandomString from '../../utils/generateRandomString';

function ButtonWrapper() {
  const history = useHistory();
  const createNewRoom = () => {
    history.push(`/room/${generateRandomString(10)}`);
  };
  return (
    <Container>
      <SelectButton backgroundColor="#FF742E" onClick={createNewRoom}>
        <div>
          <MdVideocam size={55} />
        </div>
        <small>New Metting</small>
      </SelectButton>
      <SelectButton backgroundColor="#0E71EB">
        <div>
          <MdAddBox size={55} />
        </div>
        <small>Schedule</small>
      </SelectButton>
      <SelectButton backgroundColor="#0E71EB">
        <div>
          <MdToday size={55} />
        </div>
        <small>Join</small>
      </SelectButton>
      <SelectButton backgroundColor="#0E71EB">
        <div>
          <MdScreenShare size={55} />
        </div>
        <small>Share Screen</small>
      </SelectButton>
    </Container>
  );
}

export default ButtonWrapper;
