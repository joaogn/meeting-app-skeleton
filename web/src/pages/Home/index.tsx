import React from 'react';
import { MdSearch } from 'react-icons/md';
import {
  Container,
  Topbar,
  Searcher,
  Avatar,
  SideWrapper,
  ContentWrapper,
} from './styles';

import Navbar from './NavBar';
import ButtonWrapper from './ButtonWrapper';
import Shedule from './Shedule';

function Home() {
  return (
    <Container>
      <Topbar>
        <Navbar />
        <div>
          <Searcher>
            <MdSearch size={25} />
            <input placeholder="search" />
          </Searcher>
          <Avatar>
            <h2>J</h2>
          </Avatar>
        </div>
      </Topbar>
      <ContentWrapper>
        <SideWrapper>
          <ButtonWrapper />
        </SideWrapper>
        <SideWrapper>
          <Shedule />
        </SideWrapper>
      </ContentWrapper>
    </Container>
  );
}

export default Home;
