import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
  height: 500px;
`;

export const Timer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #364c62;
  border: 0px solid #000000;
  width: 100%;
  height: 20%;
  border-radius: 14px 14px 0px 0px;
  color: #fff;
  h1 {
    font-size: 35px;
  }
`;

export const Shedule = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 0px 0px 14px 14px;
  box-shadow: 0px 3px 5px -2px rgb(212 185 185);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
