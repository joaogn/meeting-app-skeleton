import React, { useState, useEffect, useCallback } from 'react';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
import Control from './Control';
import { Container, Chat } from './styles';
import { socket } from '../../services/socket';
import { peer } from '../../services/peer';
import MainVideo from './MainVideo';
import { useRecorder, RecorderProvider } from './recordContext';

interface StreamData {
  stream: MediaStream;
  userId: string;
  videoElement: HTMLVideoElement;
}
interface Params {
  roomId: string;
}

function Meeting() {
  const [mainstream, setMainStream] = useState<MediaStream>();
  const [mainVideoElement, setMainVideoElement] = useState<HTMLVideoElement>();
  const [streamList, setStreamList] = useState<StreamData[]>([]);
  const [id, setId] = useState<string>();
  const [call, setCall] = useState<Peer.MediaConnection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { roomId } = useParams<Params>();
  const {
    stopRecording,
    startRecording,
    isRecording,
    downloadVideos,
    addAudioWhenRecording,
  } = useRecorder();

  /*
  const simulateUsers = useCallback(
    (qtd: number) => {
      if (!mainstream) return;
      const newArray: StreamData[] = [];
      for (let i = 0; i < qtd; i++) {
        const newId = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 5);
        const videoElement = document.createElement('video');
        videoElement.id = `${newId}video`;
        videoElement.style.display = 'none';
        videoElement.srcObject = mainstream;
        videoElement.addEventListener('loadedmetadata', () => {
          videoElement.play();
        });
        newArray.push({ userId: newId, stream: mainstream, videoElement });
        setStreamList(newArray);
      }
    },
    [mainstream],
  );
*/

  const createVideoElement = useCallback(
    (stream: MediaStream, muted = false): HTMLVideoElement => {
      const videoElement = document.createElement('video');
      videoElement.id = stream.id;
      videoElement.style.display = 'none';
      videoElement.srcObject = stream;
      videoElement.muted = muted;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
      });
      return videoElement;
    },
    [],
  );

  const joinAudiosToStream = useCallback(
    (stream: MediaStream) => {
      const listOfAudioStream: MediaStreamAudioSourceNode[] = [];
      const audioContext = new AudioContext();
      if (mainstream) {
        listOfAudioStream.push(
          audioContext.createMediaStreamSource(mainstream),
        );
      }

      streamList.forEach(streamElement => {
        listOfAudioStream.push(
          audioContext.createMediaStreamSource(streamElement.stream),
        );
      });

      const joinedAudioStream = audioContext.createMediaStreamDestination();

      listOfAudioStream.forEach(audioIn => {
        audioIn.connect(joinedAudioStream);
      });

      stream.addTrack(joinedAudioStream.stream.getAudioTracks()[0]);
      return stream;
    },
    [mainstream, streamList],
  );

  const startRecord = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasElt: any = document.querySelector('canvas');
    if (!canvasElt) return;
    const stream: MediaStream = canvasElt.captureStream(30);

    const streamWithAudios = joinAudiosToStream(stream);

    startRecording(streamWithAudios);
  }, [joinAudiosToStream, startRecording]);

  const getCamera = useCallback(async () => {
    const camera = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const videoElement = createVideoElement(camera, true);
    setMainVideoElement(videoElement);
    setMainStream(camera);
  }, [createVideoElement]);

  function callToUser(userId: string, stream: MediaStream) {
    peer.call(userId, stream);
  }

  const removeStream = useCallback(userToRemove => {
    setStreamList(oldList => {
      return oldList.filter(({ userId }) => userId !== userToRemove);
    });
  }, []);

  const addNewStreamAndCallBack = useCallback(
    (newUserId: string, stream: MediaStream) => {
      setStreamList(oldList => {
        if (!mainstream) return oldList;
        const hasCalled = oldList.find(({ userId }) => userId === newUserId);
        if (hasCalled) {
          return oldList;
        }
        const videoElement = createVideoElement(stream);
        if (isRecording) {
          addAudioWhenRecording(stream);
        }
        callToUser(newUserId, mainstream);
        return [...oldList, { userId: newUserId, stream, videoElement }];
      });
    },
    [addAudioWhenRecording, createVideoElement, isRecording, mainstream],
  );

  useEffect(() => {
    setLoading(true);
    getCamera();
    peer.on('open', setId);
    peer.on('call', setCall);
  }, [getCamera]);

  useEffect(() => {
    if (!mainstream) return;
    if (!id) return;
    if (!roomId) return;
    socket.on('user-connected', (userId: string) => {
      peer.call(userId, mainstream);
    });
    socket.on('user-disconnected', (userId: string) => removeStream(userId));
    socket.emit('join-room', roomId, id);
  }, [removeStream, mainstream, id, roomId]);

  useEffect(() => {
    if (!mainstream) return;
    if (!call) return;
    call.answer(mainstream);
    call.on('stream', stream => addNewStreamAndCallBack(call.peer, stream));
    call.on('error', () => removeStream(call.peer));
    call.on('close', () => removeStream(call.peer));
    setCall(null);
  }, [removeStream, addNewStreamAndCallBack, call, mainstream]);

  useEffect(() => {
    if (!mainstream) return;
    if (!mainVideoElement) return;
    if (!id) return;
    // simulateUsers(24);
    setLoading(false);
  }, [mainVideoElement, mainstream, id]);

  return (
    <Container>
      <section>
        {loading ? (
          <div className="loading-wrapper">
            <h1>Loading...</h1>
          </div>
        ) : (
          <>
            {id && mainVideoElement && (
              <MainVideo
                id={id}
                streamList={streamList}
                mainVideoElement={mainVideoElement}
              />
            )}
          </>
        )}
        <footer>
          <Control
            isRecording={isRecording}
            setIsRecording={isRecording ? stopRecording : startRecord}
            endClick={() => downloadVideos()}
          />
        </footer>
      </section>
      <section>
        <Chat className="chat">
          <h1>Chat</h1>
          <div />
          <textarea placeholder="Type text here..." />
        </Chat>
      </section>
    </Container>
  );
}

export default () => {
  return (
    <RecorderProvider>
      <Meeting />
    </RecorderProvider>
  );
};
