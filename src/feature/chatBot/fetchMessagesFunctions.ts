import { fetchMessages as fetchChatMessages } from 'src/services/chatBotServices/chatBotService';
import { ChatMessage } from "src/models/chatMessage";

export const fetchMessages = async (
  token: string,
  addNewMessage: (newMessage: ChatMessage) => void,
) => {
  try {
    const result = await fetchChatMessages(token);
    if (result.metadata.messages.length === 0) {
      return 'Aucun chat trouvé, veuillez envoyer un message.';
    } else {
      const messages: ChatMessage[] = result.metadata.messages;
      messages.forEach((message: ChatMessage) => {
        const newMessage: ChatMessage = {
          user_message: message.user_message,
          created_at: message.created_at,
          gpt_response: message.gpt_response
        };
        addNewMessage(newMessage);
      });
    }
  } catch (error) {
    throw new Error('Erreur lors du chargement du chat.');
  }
};
