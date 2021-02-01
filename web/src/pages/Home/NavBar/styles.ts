import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    background: none;
    border: none;
    margin-right: 20px;
    small {
      color: gray;
    }
    svg {
      color: gray;
    }
    &:hover {
      small {
        color: #0e71eb;
      }
      svg {
        color: #0e71eb;
      }
    }
  }
`;
