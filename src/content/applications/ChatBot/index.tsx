import { useEffect, useRef, useState } from 'react';

import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import ChatContent from './ChatContent';
import Scrollbar from 'src/components/Scrollbar';
import { ChatMessage } from 'src/models/chatMessage';
import { IndexRootWrapper, ChatWindow, ChatTopBar } from "src/styled/ChatStyles";

import {
  Box,
  Divider,
} from '@mui/material';
import { scrollToBottom } from 'src/utils/chatbot/chatUtils';
import VoiceToText from './VoiceToText';

function ApplicationsMessenger() {
  const [inputValue, setInputValue] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [radomToScroll, setRandomToScroll] = useState<number>(1);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  const addNewMessage = (newMessage: ChatMessage) => {
    chatMessages.push(newMessage);
  };
  useEffect(()=>{
    scrollToBottom(chatEndRef);
  },[radomToScroll])

  const updateLastMessage = (gptResponse: string) => {
    setChatMessages((prevMessages) => {
      if (prevMessages.length === 0) return prevMessages;

      const updatedMessages = [...prevMessages];

      const lastMessageIndex = updatedMessages.length - 1;
      updatedMessages[lastMessageIndex] = {
        ...updatedMessages[lastMessageIndex],
        gpt_response: gptResponse,
        created_at: 'Just now'
      };
      return updatedMessages;
    });
  };

  return (
    <>
      <Helmet>
        <title>ChatBot </title>
      </Helmet>
      <IndexRootWrapper className="Mui-FixedWrapper">
          <ChatWindow>
          <ChatTopBar
            sx={{
              display: { xs: 'flex', lg: 'inline-block' }
            }}
          >
            <TopBarContent />
          </ChatTopBar>
            <Box flex={1}>
              <Scrollbar>
                <ChatContent
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                />
                <div ref={chatEndRef}></div>
              </Scrollbar>
            </Box>
            <Divider />
            <BottomBarContent
              inputValue={inputValue}
              setInputValue={setInputValue}
              addNewMessage={addNewMessage}
              updateLastMessage={updateLastMessage}
              setRandomToScroll={setRandomToScroll}
            />
          </ChatWindow>
      </IndexRootWrapper>
    </>
  );
}

export default ApplicationsMessenger;
