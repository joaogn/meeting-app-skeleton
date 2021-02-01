import styled, { css } from 'styled-components';

interface Props {
  totalStreams: number;
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 90%;
  .canvasWrapper {
    position: absolute;
    width: 100%;
    height: 90%;
    z-index: 0;
    background: black;
  }
  .videoWrapper {
    position: absolute;
    width: 100%;
    height: 90%;
    display: flex;
    flex-wrap: wrap;
    z-index: 2;
    justify-content: center;
    align-items: center;
    background: transparent;
    .grid-camera {
      background-color: transparent;
      margin: 5px;
      ${({ totalStreams }) => {
        if (totalStreams === 1) {
          return css`
            width: 95%;
            height: 95%;
          `;
        }
        if (totalStreams === 2) {
          return css`
            width: 45%;
            height: 95%;
          `;
        }
        if (totalStreams > 2 && totalStreams < 5) {
          return css`
            width: 45%;
            height: 45%;
          `;
        }
        if (totalStreams > 5 && totalStreams < 10) {
          return css`
            width: 30%;
            height: 30%;
          `;
        }
        if (totalStreams > 10 && totalStreams < 17) {
          return css`
            width: 20%;
            height: 20%;
          `;
        }
        return css`
          width: 15%;
          height: 20%;
        `;
      }}
    }
    .self-camera {
      ${({ totalStreams }) => {
        if (totalStreams === 0) {
          return css`
            width: 95%;
            height: 95%;
          `;
        }
        return css`
          position: absolute;
          width: 10%;
          height: 15%;
          bottom: 0;
          right: 0;
        `;
      }}
    }
  }
`;
