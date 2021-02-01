/* eslint-disable react/prop-types */
import React from 'react';
import {
  MdVideocam,
  MdMicNone,
  MdPeople,
  MdChatBubble,
  MdFiberManualRecord,
  MdInsertEmoticon,
} from 'react-icons/md';

import { Container, ControlButton, RecordButton, EndButton } from './styles';

interface Props {
  isRecording: boolean;
  setIsRecording(): void;
  endClick(): void;
}

function Control({ isRecording, setIsRecording, endClick }: Props) {
  return (
    <Container>
      <div>
        <ControlButton>
          <MdMicNone size={25} />
          <p>Mute</p>
        </ControlButton>
        <ControlButton>
          <MdVideocam size={25} />
          <p>Stop Video</p>
        </ControlButton>
      </div>
      <div>
        <ControlButton>
          <MdPeople size={25} />
          <p>Group</p>
        </ControlButton>
        <ControlButton>
          <MdChatBubble size={25} />
          <p>Chat</p>
        </ControlButton>
        <RecordButton
          isRecording={isRecording}
          onClick={() => setIsRecording()}
        >
          <MdFiberManualRecord size={25} />
          <p>Record</p>
        </RecordButton>
        <ControlButton>
          <MdInsertEmoticon size={25} />
          <p>Reactions</p>
        </ControlButton>
      </div>
      <div>
        <EndButton type="button" onClick={() => endClick()}>
          End
        </EndButton>
      </div>
    </Container>
  );
}

export default Control;
