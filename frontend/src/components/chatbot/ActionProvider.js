// src/components/chatbot/ActionProvider.js

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // 인사 메시지
    greet() {
        const greetingMessage = this.createChatBotMessage('안녕하세요! 만나서 반가워요.');
        this.updateChatbotState(greetingMessage);
    }

    // 지원 정책 문의
    handleSupportInquiry() {
        const message = this.createChatBotMessage("정부 지원 정책이 궁금하시군요. 한부모가족 지원, 양육비 지원 등 다양한 정보가 있어요. '맞춤 지원' 메뉴에서 더 자세히 확인해 보실 수 있습니다.");
        this.updateChatbotState(message);
    }

    // 정서적 지지
    handleEmotionalSupport() {
        const message = this.createChatBotMessage('마음이 힘드셨군요. 괜찮아요. 누구나 그럴 때가 있어요. 잠시 눈을 감고ゆっくり 숨을 쉬어보는 건 어떨까요? 제가 곁에 있을게요.');
        this.updateChatbotState(message);
    }

    // 알 수 없는 메시지
    handleUnknown() {
        const message = this.createChatBotMessage('죄송해요, 아직 이해하지 못하는 말이에요. 좀 더 쉬운 단어로 말씀해주시겠어요?');
        this.updateChatbotState(message);
    }

    // 챗봇 상태 업데이트 헬퍼 함수
    updateChatbotState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }
}

export default ActionProvider;
