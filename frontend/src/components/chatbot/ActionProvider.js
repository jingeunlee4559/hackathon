// src/components/chatbot/ActionProvider.js

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // API를 통해 답변 가져오기
    async handleMessage(message) {
        try {
            // 로딩 메시지 표시
            const loadingMessage = this.createChatBotMessage('답변을 준비하고 있어요... 잠시만 기다려주세요 🤔');
            this.updateChatbotState(loadingMessage);

            console.log('Sending message:', message);

            const response = await fetch('http://localhost:8090/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    question: message
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            // 로딩 메시지 제거하고 실제 답변 추가
            this.setState((prevState) => {
                const messages = [...prevState.messages];
                messages.pop(); // 로딩 메시지 제거
                return {
                    ...prevState,
                    messages: [...messages, this.createChatBotMessage(data.answer || '답변을 받지 못했습니다.')]
                };
            });

        } catch (error) {
            console.error('API 호출 오류:', error);

            // 로딩 메시지 제거하고 에러 메시지 추가
            this.setState((prevState) => {
                const messages = [...prevState.messages];
                messages.pop(); // 로딩 메시지 제거
                return {
                    ...prevState,
                    messages: [...messages, this.createChatBotMessage(`오류 발생: ${error.message}`)]
                };
            });
        }
    }

    // 인사 메시지 (기본 응답으로 유지)
    greet() {
        const greetingMessage = this.createChatBotMessage('안녕하세요! 만나서 반가워요.');
        this.updateChatbotState(greetingMessage);
    }

    // 지원 정책 문의 (기본 응답으로 유지)
    handleSupportInquiry() {
        const message = this.createChatBotMessage("정부 지원 정책이 궁금하시군요. 한부모가족 지원, 양육비 지원 등 다양한 정보가 있어요. '맞춤 지원' 메뉴에서 더 자세히 확인해 보실 수 있습니다.");
        this.updateChatbotState(message);
    }

    // 정서적 지지 (기본 응답으로 유지)
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
