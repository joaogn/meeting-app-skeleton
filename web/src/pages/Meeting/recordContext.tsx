import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react';
import generateRandomString from '../utils/generateRandomString';

interface Props {
  children?: React.ReactNode;
}

interface RecorderContextData {
  stopRecording: () => Promise<void>;
  startRecording: (stream: MediaStream) => void;
  isRecording: boolean;
  downloadVideos: () => void;
  addAudioWhenRecording: (stream: MediaStream) => void;
}

const VIDEO_TYPE = 'video/webm';

const RecorderContext = createContext<RecorderContextData>(
  {} as RecorderContextData,
);

function RecorderProvider({ children }: Props) {
  const recordStream = useRef<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const getRecordOptions = () => {
    const commonCodecs = ['codecs=vp9,opus', 'codecs=vp8,opus', ''];
    const options = commonCodecs
      .map(codec => ({
        mimeType: `${VIDEO_TYPE};${codec}`,
      }))
      .find(option => MediaRecorder.isTypeSupported(option.mimeType));
    if (!options) {
      throw new Error('Codecs not supported');
    }
    return options;
  };

  const downloadVideos = useCallback(async () => {
    if (!recordedBlobs.length) return;

    recordedBlobs.forEach(async record => {
      const url = window.URL.createObjectURL(record);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const filename = generateRandomString();
      a.download = `${filename}.webm`;
      document.body.appendChild(a);
      a.click();
    });
  }, [recordedBlobs]);

  const startMediaRecorder = useCallback(() => {
    if (!recordStream.current) return;
    mediaRecorder.current = new MediaRecorder(
      recordStream.current,
      getRecordOptions(),
    );

    if (!mediaRecorder.current) return;

    mediaRecorder.current.ondataavailable = (event: any) => {
      if (!event.data || !event.data.size) return;
      setRecordedBlobs((oldRecordedBlobs: any) => [
        ...oldRecordedBlobs,
        event.data,
      ]);
    };

    mediaRecorder.current.start();
  }, []);

  const addAudioWhenRecording = useCallback(
    (newStream: MediaStream) => {
      if (!recordStream.current) return;
      if (!mediaRecorder.current) return;

      const audioContext = new AudioContext();

      const currentAudioIn = audioContext.createMediaStreamSource(
        recordStream.current,
      );
      const newAudioIn = audioContext.createMediaStreamSource(newStream);

      const newAudioStream = audioContext.createMediaStreamDestination();

      currentAudioIn.connect(newAudioStream);
      newAudioIn.connect(newAudioStream);

      mediaRecorder.current.stop();
      recordStream.current.removeTrack(
        recordStream.current.getAudioTracks()[0],
      );
      recordStream.current.addTrack(newAudioStream.stream.getAudioTracks()[0]);
      startMediaRecorder();
    },
    [startMediaRecorder],
  );

  const startRecording = useCallback(
    (stream: MediaStream) => {
      recordStream.current = stream;
      startMediaRecorder();
      setIsRecording(true);
    },
    [startMediaRecorder],
  );

  const stopRecording = useCallback(async () => {
    if (!mediaRecorder.current) return;
    if (mediaRecorder.current.state === 'inactive') return;
    mediaRecorder.current.stop();
    await new Promise(resolve => setTimeout(resolve, 200));
    setIsRecording(false);
  }, [mediaRecorder]);

  return (
    <RecorderContext.Provider
      value={{
        stopRecording,
        startRecording,
        isRecording,
        downloadVideos,
        addAudioWhenRecording,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
}

function useRecorder(): RecorderContextData {
  const context = useContext(RecorderContext);
  if (!context) {
    throw new Error('useRecorder must be used within an RecorderProvider');
  }
  return context;
}

export { RecorderProvider, useRecorder };
