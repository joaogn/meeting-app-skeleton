/* eslint-disable no-param-reassign */
import React, { useRef, useCallback, useEffect } from 'react';

import { Container } from './styles';

interface StreamData {
  stream: MediaStream;
  userId: string;
  videoElement: HTMLVideoElement;
}

interface Props {
  streamList: StreamData[];
  id: string;
  mainVideoElement: HTMLVideoElement;
  screenVideoElement?: HTMLVideoElement;
}

interface drawStreamProps {
  context: CanvasRenderingContext2D;
  userId: string;
  videoElement: HTMLVideoElement;
}

function MainVideo({
  id,
  streamList,
  mainVideoElement,
  screenVideoElement,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const clearCanvas = useCallback((context: CanvasRenderingContext2D) => {
    if (!videoWrapperRef.current) return;
    context.canvas.width = videoWrapperRef.current.clientWidth;
    context.canvas.height = videoWrapperRef.current.clientHeight;
  }, []);

  const drawStream = useCallback(
    async ({ context, userId, videoElement }: drawStreamProps) => {
      const div = document.getElementById(userId);
      if (!div) return;
      if (!userId) return;
      if (!videoElement) return;
      videoElement.width = div.offsetWidth;
      videoElement.width = div.offsetHeight;
      context.drawImage(
        videoElement,
        div.offsetLeft,
        div.offsetTop,
        div.offsetWidth,
        div.offsetHeight,
      );
    },
    [],
  );

  const draw = useCallback(async () => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d', { alpha: false });
    if (!context) return;

    clearCanvas(context);

    streamList.map(streamElement => drawStream({ context, ...streamElement }));

    if (screenVideoElement) {
      drawStream({
        context,
        userId: 'screen',
        videoElement: screenVideoElement,
      });
    }

    drawStream({ context, userId: id, videoElement: mainVideoElement });
    requestAnimationFrame(draw);
  }, [
    clearCanvas,
    drawStream,
    id,
    mainVideoElement,
    screenVideoElement,
    streamList,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!videoWrapperRef.current) return;
    canvasRef.current.width = videoWrapperRef.current.clientHeight;
    canvasRef.current.height = videoWrapperRef.current.clientHeight;
    requestAnimationFrame(draw);
  }, [draw, canvasRef]);

  return (
    <Container totalStreams={streamList.length} id="main-video">
      <canvas ref={canvasRef} className="canvasWrapper" />
      <div ref={videoWrapperRef} className="videoWrapper">
        {id && <div id={id} className="self-camera" />}
        {screenVideoElement && <div id="screen" />}
        {streamList.map(({ userId }) => (
          <div key={userId} id={userId} className="grid-camera" />
        ))}
      </div>
    </Container>
  );
}

export default MainVideo;
