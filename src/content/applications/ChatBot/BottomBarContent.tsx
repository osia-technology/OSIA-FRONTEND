import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  useTheme
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { ChatMessage } from "src/models/chatMessage";
import { useSelector } from 'react-redux';
import { selectToken, selectUsername, selectRole } from 'src/store';
import { sendMessage } from 'src/services/chatBotServices/chatBotService';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { MessageInputWrapper, Input } from "src/styled/ChatStyles";
import { getUserAvatar } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import VoiceToText from './VoiceToText';


interface InputComponentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addNewMessage: (value: ChatMessage) => void;
  updateLastMessage: (gtpResponse: string) => void;
  setRandomToScroll: (value: number) => void;
}

const BottomBarContent: React.FC<InputComponentProps> = ({
  inputValue,
  setInputValue,
  addNewMessage,
  updateLastMessage,
  setRandomToScroll
}) => {
  const { handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const username = useSelector(selectUsername);
  const theme = useTheme();
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);
  const UserAvatar = getUserAvatar(role);
  const { t } = useTranslation();

  
  const handleAddUserMessage = async () => {
    
    try {
      let tempValue = inputValue;
      setInputValue('');
      if(tempValue != ""){
        let newMessage: ChatMessage = {
          created_at: '',
          gpt_response: '',
          user_message: tempValue
        };
        addNewMessage(newMessage);
        setRandomToScroll(Math.random()*0.5)
        const response = await sendMessage(token, inputValue);
        if (response.metadata.response != '') {
          updateLastMessage(response.metadata.response);
          setRandomToScroll(Math.random()*0.5)
        }
      }else{
        handleShowSnackbar('Impossible d\'envoyer un méssage vide', 'warning');
      }
    } catch (error) {
      handleShowSnackbar(t('chat_load_error'), 'error');
      console.error(t('chat_load_error'), error);
    }
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddUserMessage()
    }
  };
  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}
    >
      <Box flexGrow={1} display="flex" alignItems="center">
        <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={username}
          src={UserAvatar}
        />
        <MessageInputWrapper
          autoFocus
          placeholder={t('write_message_here')}
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnterPress}
        />
      </Box>
      <Box>
        <VoiceToText setInputValue={setInputValue}/>
        {/* <Input accept="image/*" id="messenger-upload-file" type="file" /> */}
        <Tooltip arrow placement="top" title={t('add_file')}>
          <label htmlFor="messenger-upload-file">
            <IconButton
              sx={{ mx: 1 }}
              color="primary"
              component="span"
              onClick={() => {
                handleShowSnackbar(t('not_available_yet'), 'warning');
              }}
            >
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip>
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={handleAddUserMessage}
        >
          {t('send')}
        </Button>
      </Box>
      <SnackbarNotification
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
};

export default BottomBarContent;
