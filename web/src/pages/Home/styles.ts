import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export const Topbar = styled.header`
  height: 50px;
  background-color: rgb(238, 238, 248);
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

export const Searcher = styled.div`
  border-radius: 20px;
  background-color: #dedee3;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-left: 5px;
    margin-right: 10px;
  }
  input {
    border: none;
    background-color: transparent;
    color: #495057;
  }
`;
export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 50%;
  background-color: gray;
  h2 {
    font-weight: black;
    color: white;
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 100%;

  &:first-child {
    justify-content: flex-end;
  }
  &:last-child {
    justify-content: flex-start;
  }
`;
