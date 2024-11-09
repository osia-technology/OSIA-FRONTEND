import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectToken, selectUsername, selectRole } from 'src/store';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { ChatMessage } from 'src/models/chatMessage';
import { ContentCopy, CheckCircle, Mic, Cancel, VolumeUp } from '@mui/icons-material';
import SnackbarNotification from 'src/components/SnackbarNotification';

import {
  getDividerLabel,
  shouldDisplayDateDivider,
  scrollToBottom,
  copyToClipboard
} from 'src/utils/chatbot/chatUtils';
import { fetchMessages } from 'src/feature/chatBot/fetchMessagesFunctions';
import { getUserAvatar } from 'src/utils/helpers';
import { AlladinAvatar, AlladinLoading } from 'src/assets/imagePath';
import { useTranslation } from 'react-i18next';
import {
  DividerWrapper,
  CardWrapperPrimary,
  CardWrapperSecondary,
  FlexContainer
} from 'src/styled/ChatStyles';
import { RootState } from 'src/app/store';

interface ChatComponentProps {
  chatMessages: ChatMessage[];
  setChatMessages: (value: ChatMessage[]) => void;
}

const ChatContent: React.FC<ChatComponentProps> = ({
  chatMessages,
  setChatMessages
}) => {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const role = useSelector(selectRole);
  const UserAvatar = getUserAvatar(role);
  const user = useSelector((state: RootState) => state.user.user);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const addNewMessage = (newMessage: ChatMessage) => {
    chatMessages.push(newMessage);
    setChatMessages(chatMessages);
  };

  useEffect(() => {
    const loadChat = async () => {
      
      try {
        const response = await fetchMessages(token, addNewMessage);
        if (response) {
          handleShowSnackbar(response, 'warning');
        } else {
          handleShowSnackbar(t('messages_loaded_successfully'), 'success');
        }
      } catch (error) {
        handleShowSnackbar(error.message, 'error');
      } finally {
        setIsLoading(false);
        scrollToBottom(chatEndRef);
      }
    };
    loadChat();
  }, [token]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }


  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      let voices = window.speechSynthesis.getVoices();
      let utterance = new SpeechSynthesisUtterance();
      utterance.voice = voices[3];
      utterance.lang = 'fr-FR';
      utterance.text = text;
  
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
  
      utterance.onend = () => {
        setIsSpeaking(false);
      };
  
      window.speechSynthesis.speak(utterance);
    } else {
      handleShowSnackbar(
        'Votre navigateur ne supporte pas la lecture de messages',
        'warning'
      );
    }
  };

  return (
    <>
      <Box p={3}>
        {chatMessages.map((message, index) => {
          const currentMessageDate = getDividerLabel(message.created_at);
          const previousMessageDate =
            index > 0
              ? getDividerLabel(chatMessages[index - 1].created_at)
              : undefined;

          return (
            <div key={index}>
              {shouldDisplayDateDivider(
                currentMessageDate,
                previousMessageDate
              ) && <DividerWrapper>{currentMessageDate}</DividerWrapper>}
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-end"
                py={3}
              >
                <Box
                  display="flex"
                  alignItems="flex-end"
                  flexDirection="column"
                  justifyContent="flex-end"
                  mr={2}
                >
                  <CardWrapperPrimary>
                    {message.user_message}
                  </CardWrapperPrimary>
                  <Typography
                    variant="subtitle1"
                    sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
                  >
                    <ScheduleTwoToneIcon sx={{ mr: 0.5 }} fontSize="small" />
                    {message.created_at}
                  </Typography>
                </Box>
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  alt={user.username}
                  src={UserAvatar}
                />
              </Box>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                py={3}
              >
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50 }}
                  alt="Alladin"
                  src={AlladinAvatar}
                />
                <Box
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  justifyContent="flex-start"
                  ml={2}
                >
                  {message.gpt_response === '' ? (
                    <img src="/static/animations/progress.gif" width="30px" />
                  ) : (
                    <>
                      <CardWrapperSecondary>
                        <p style={{ margin: 0 }}>{message.gpt_response}</p>
                        <FlexContainer>
                          <Tooltip
                            arrow
                            placement="top"
                            title={
                              copiedIndex === index
                                ? 'Copié avec succès !'
                                : 'Copier'
                            }
                          >
                            <IconButton
                              onClick={() =>
                                copyToClipboard(
                                  message.gpt_response,
                                  index,
                                  setCopiedIndex
                                )
                              }
                            >
                              {copiedIndex === index ? (
                                <CheckCircle fontSize="small" color="success" />
                              ) : (
                                <ContentCopy fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            arrow
                            placement="top"
                            title={isSpeaking == false ? 'Read' : 'Cancel'}
                          >
                            <IconButton
                              onClick={() => {
                                if (isSpeaking) {
                                  stopSpeaking();
                                } else {
                                 speak( message.gpt_response);
                                }
                              }}
                            >
                              {isSpeaking == false ? (
                                <VolumeUp fontSize="small" ></VolumeUp>
                              ) : (
                                <Cancel fontSize="small"></Cancel>
                              )}
                            </IconButton>
                          </Tooltip>
                        </FlexContainer>
                      </CardWrapperSecondary>
                      <Typography
                        variant="subtitle1"
                        sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
                      >
                        <ScheduleTwoToneIcon
                          sx={{ mr: 0.5 }}
                          fontSize="small"
                        />
                        {message.created_at}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </Box>
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};

export default ChatContent;
