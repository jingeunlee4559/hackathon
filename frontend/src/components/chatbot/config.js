import { createChatBotMessage } from 'react-chatbot-kit';

const botName = '따뜻한 품이';

const config = {
    botName: botName,
    initialMessages: [
        createChatBotMessage(`안녕하세요! 저는 ${botName}이에요. 😊`),
        createChatBotMessage('혼자서 고민하지 마시고, 언제든 편하게 말씀해주세요. 함께 해결책을 찾아보아요! 💛', {
            delay: 800,
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: '#FFB6C1', 
        },
        chatButton: {
            backgroundColor: '#FF8C7A', 
        },
    },
};

export default config;
