import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;

  section:first-child {
    width: 80%;
    .loading-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90%;
      h1 {
        color: #f5f5f5;
      }
    }
    #main-video {
      width: 80%;
      height: 90%;
      .canvasWrapper {
        position: absolute;
        width: 80%;
        height: 90%;
        padding: 10px;
        z-index: 0;
        background: black;
      }
      .videoWrapper {
        position: absolute;
        width: 80%;
        height: 90%;
        display: flex;
        flex-wrap: wrap;
        z-index: 9;
        justify-content: center;
        align-items: center;
        background: transparent;
      }
    }
    footer {
      background: #1c1e20;
      height: 10%;
    }
  }
  section:last-child {
    display: flex;
    width: 20%;
    background: #242324;
  }
`;

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px;
  height: 100%;
  h1 {
    color: white;
  }
  div {
    height: 98%;
  }
  textarea {
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 10%;
    resize: none;
    background: transparent;
    color: #f5f5f5;
  }
`;
