// src/components/chatbot/PoomdaChatbot.js

import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import '../../css/PoomdaChatbot.css';

import { Button } from 'react-bootstrap';
import { ChatDots, X } from 'react-bootstrap-icons';

const PoomdaChatbot = () => {
    const [showChatbot, toggleChatbot] = useState(false);

    return (
        <div>
            <Button className="chatbot-toggle-button" onClick={() => toggleChatbot((prev) => !prev)}>
                {showChatbot ? <X size={30} /> : <ChatDots size={30} />}
            </Button>

            {showChatbot && (
                <div className="chatbot-container">
                    <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} placeholderText="궁금한것을 입력해주세요" />
                </div>
            )}
        </div>
    );
};

export default PoomdaChatbot;
