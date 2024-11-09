import { Mic } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';

interface VoiceToChatProps {
  setInputValue: (value: string) => void;
}

const VoiceToText: React.FC<VoiceToChatProps> = ({setInputValue}) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'fr-FR';
      recognition.interimResults = false; 
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setInputValue(result);
        console.log(result)
      };

      recognition.start();
    } else {
      console.error(
        'API de reconnaissance vocale non supportée par ce navigateur.'
      );
    }
  };

  return (
    <Tooltip arrow placement="top" title="Message vocal">
      <IconButton
        sx={{ mx: 1 }}
        color="primary"
        component="span"
        onClick={() => {
            startListening()
        }}
      >
        <Mic fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default VoiceToText;
