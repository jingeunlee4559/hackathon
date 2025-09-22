// src/components/chatbot/config.js

import { createChatBotMessage } from 'react-chatbot-kit';

const botName = '따뜻한 품이';

const config = {
    botName: botName,
    initialMessages: [
        createChatBotMessage(`안녕하세요! 저는 ${botName}에요.😊`),
        createChatBotMessage('혼자 고민하지 마세요. 어떤 이야기든 편하게 들려주세요.', {
            delay: 500,
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: '#FFB6C1', // 연한 핑크
        },
        chatButton: {
            backgroundColor: '#FF8C7A', // 연한 코랄
        },
    },
};

export default config;
