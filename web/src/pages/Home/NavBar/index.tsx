/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import {
  MdHome,
  MdChatBubble,
  MdAccessTime,
  MdPersonOutline,
} from 'react-icons/md';

import { Container } from './styles';

function NavBar() {
  return (
    <Container>
      <button type="button" onClick={() => {}}>
        <MdHome size={25} />
        <small>Home</small>
      </button>
      <button type="button" onClick={() => {}}>
        <MdChatBubble size={25} />
        <small>Chat</small>
      </button>
      <button type="button" onClick={() => {}}>
        <MdAccessTime size={25} />
        <small>Mettings</small>
      </button>
      <button type="button" onClick={() => {}}>
        <MdPersonOutline size={25} />
        <small>Contacts</small>
      </button>
    </Container>
  );
}

export default NavBar;
