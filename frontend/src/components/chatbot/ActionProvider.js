// src/components/chatbot/ActionProvider.js

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    // 일상 대화 감지
    isCasualConversation(message) {
        const casualKeywords = [
            '안녕', '반가워', '좋은 하루', '오늘', '날씨', '기분',
            '고마워', '감사', '잘 지내', '어때', '뭐해', '재미있',
            '심심', '피곤', '배고파', '잠깐', '그냥', '음',
            '아하', '오', '와', '헉', '어머', '진짜', '정말',
            '농담', '웃기', '재밌', 'ㅋㅋ', 'ㅎㅎ', '하하'
        ];

        const lowerMessage = message.toLowerCase();
        return casualKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    // 상세 정보 요청 키워드 체크 (페이지 유도용)
    isDetailedPolicyInquiry(message) {
        const detailKeywords = [
            '상세', '자세히', '더 알고 싶', '구체적', '신청방법',
            '어떻게 신청', '신청 절차', '자세한 정보', '상세 정보',
            '더 많은 정보', '구체적인 방법', '정확한 방법', '세부사항', '세부 정보'
        ];

        const lowerMessage = message.toLowerCase();

        // 정책 관련 키워드도 포함되어야 함
        const policyKeywords = [
            '정책', '지원', '혜택', '복지', '신청', '조건', '자격',
            '주거', '교육', '의료', '양육비', '보조금', '융자',
            '한부모', '미혼모', '생계비', '장학금', '보육'
        ];

        const hasDetailKeyword = detailKeywords.some(keyword => lowerMessage.includes(keyword));
        const hasPolicyKeyword = policyKeywords.some(keyword => lowerMessage.includes(keyword));

        return hasDetailKeyword && hasPolicyKeyword;
    }

    // API를 통해 답변 가져오기
    async handleMessage(message) {
        try {
            // 상세 정책 정보 요청인지 먼저 체크
            if (this.isDetailedPolicyInquiry(message)) {
                this.handlePolicyInquiry(message);
                return;
            }

            // 일상 대화인지 체크
            if (this.isCasualConversation(message)) {
                this.handleCasualConversation(message);
                return;
            }

            // 로딩 메시지 표시
            const loadingMessage = this.createChatBotMessage('잠시만 기다려주세요... 좋은 답변을 준비하고 있어요 💭');
            this.updateChatbotState(loadingMessage);

            console.log('Sending message:', message);

            // AbortController로 타임아웃 처리
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 45000); // 45초 타임아웃

            const response = await fetch('http://localhost:8090/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    question: message
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            // 로딩 메시지 제거하고 타이핑 효과로 실제 답변 추가
            this.setState((prevState) => {
                const messages = [...prevState.messages];
                messages.pop(); // 로딩 메시지 제거
                return {
                    ...prevState,
                    messages: messages
                };
            });

            // 타이핑 효과로 답변 출력
            this.typeMessage(data.answer || '답변을 받지 못했습니다.');

        } catch (error) {
            console.error('API 호출 오류:', error);

            let errorMessage = '앗, 죄송해요. 잠깐 문제가 생겼네요. 😅';

            if (error.name === 'AbortError') {
                errorMessage = '답변을 준비하는 데 시간이 좀 걸리고 있어요. 다시 한 번 말씀해주시겠어요? 🙏';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = '지금 연결이 잘 안 되고 있어요. 잠시 후에 다시 말씀해주시면 도와드릴게요! 💪';
            } else if (error.message.includes('서버 오류')) {
                errorMessage = '제가 잠깐 정신이 없었나 봐요. 다시 한 번 말씀해주시겠어요? 😊';
            }

            // 로딩 메시지 제거하고 에러 메시지 추가
            this.setState((prevState) => {
                const messages = [...prevState.messages];
                messages.pop(); // 로딩 메시지 제거
                return {
                    ...prevState,
                    messages: [...messages, this.createChatBotMessage(errorMessage)]
                };
            });
        }
    }

    // 일상 대화 처리
    handleCasualConversation(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        if (lowerMessage.includes('안녕') || lowerMessage.includes('반가')) {
            response = '안녕하세요! 만나서 반가워요 😊 오늘 하루는 어떻게 보내고 계세요?';
        } else if (lowerMessage.includes('고마') || lowerMessage.includes('감사')) {
            response = '별 말씀을요! 도움이 되어서 정말 기뻐요 🥰 언제든 필요하시면 말씀해주세요!';
        } else if (lowerMessage.includes('기분') || lowerMessage.includes('오늘')) {
            response = '오늘 하루 어떠셨어요? 좋은 일이 있으셨길 바라요 ✨ 혹시 힘든 일이 있으시다면 언제든 이야기해주세요!';
        } else if (lowerMessage.includes('날씨')) {
            response = '날씨 이야기를 하시는군요! 😌 날씨가 좋으면 기분도 좋아지는 것 같아요. 오늘 바깥 날씨는 어떤가요?';
        } else if (lowerMessage.includes('피곤') || lowerMessage.includes('힘들')) {
            response = '많이 피곤하시겠어요 😔 하루하루가 쉽지 않으시겠지만, 충분히 잘 하고 계세요. 잠시 쉬어가도 괜찮아요!';
        } else if (lowerMessage.includes('심심') || lowerMessage.includes('뭐해')) {
            response = '심심하시는군요! 😄 저와 이야기하며 시간을 보내셔도 좋고, 궁금한 것이 있으시면 언제든 물어보세요!';
        } else if (lowerMessage.includes('ㅋㅋ') || lowerMessage.includes('ㅎㅎ') || lowerMessage.includes('하하')) {
            response = '웃음소리가 들리니까 저도 기분이 좋아지네요! 😆 웃음은 정말 좋은 에너지를 주는 것 같아요!';
        } else if (lowerMessage.includes('잘 지내') || lowerMessage.includes('어때')) {
            response = '저는 덕분에 잘 지내고 있어요! 😊 더 중요한 건 어떻게 지내고 계신지인데요. 요즘은 어떠세요?';
        } else {
            // 기본 일상 대화 응답
            response = '네, 그렇군요! 😊 편안하게 이야기 나누고 있어서 좋아요. 혹시 다른 궁금한 것이 있으시거나 도움이 필요한 일이 있으시면 언제든 말씀해주세요!';
        }

        const responseMessage = this.createChatBotMessage(response);
        this.updateChatbotState(responseMessage);
    }

    // 정책 상세 문의 처리
    handlePolicyInquiry(message) {
        const responseMessage = this.createChatBotMessage(
            '정책에 대해 더 자세히 알고 싶으시는군요! 😊\n\n' +
            '더 구체적이고 상세한 정보는 "정보자료실"에서 확인해보시는 게 좋을 것 같아요.\n\n' +
            '🌟 이런 지원들이 준비되어 있어요:\n' +
            '• 주거 지원 (전월세보증금, 매입임대 등)\n' +
            '• 양육비 지원 (아동양육비, 보육료 등)\n' +
            '• 교육비 지원 (학비, 급식비 등)\n' +
            '• 의료비 지원 (건강보험, 의료급여 등)\n\n' +
            '💡 화면 위쪽 "정보자료실" 메뉴를 클릭하시면 더 자세한 내용과 신청방법을 확인하실 수 있어요!\n\n' +
            '혼자가 아니에요. 함께 해결해나가요! 💪✨'
        );
        this.updateChatbotState(responseMessage);
    }

    // 인사 메시지 (기본 응답으로 유지)
    greet() {
        const greetingMessage = this.createChatBotMessage('안녕하세요! 만나서 정말 반가워요. 😊 무엇을 도와드릴까요?');
        this.updateChatbotState(greetingMessage);
    }

    // 지원 정책 문의 (기본 응답으로 유지)
    handleSupportInquiry() {
        const message = this.createChatBotMessage("지원 정책에 관심이 있으시는군요! 😊 한부모가족을 위한 다양한 지원이 준비되어 있어요. 주거지원, 양육비, 교육비 등 많은 도움을 받으실 수 있답니다. 구체적으로 어떤 부분이 궁금하신가요?");
        this.updateChatbotState(message);
    }

    // 정서적 지지 (기본 응답으로 유지)
    handleEmotionalSupport() {
        const message = this.createChatBotMessage('마음이 많이 힘드셨을 것 같아요. 🫂 이런 감정을 느끼시는 건 정말 자연스러운 일이에요. 잠시 깊게 숨을 쉬어보시고, 지금 이 순간 자신을 조금 더 따뜻하게 바라봐주세요. 혼자가 아니에요, 제가 여기 있어요. 💛');
        this.updateChatbotState(message);
    }

    // 알 수 없는 메시지
    handleUnknown() {
        const message = this.createChatBotMessage('앗, 제가 아직 잘 이해하지 못했나 봐요. 😅 조금 더 쉽게 말씀해주시거나, 다른 방식으로 물어봐주시면 더 잘 도와드릴 수 있을 것 같아요!');
        this.updateChatbotState(message);
    }

    // 타이핑 효과로 메시지 출력
    typeMessage(text, speed = 30) {
        const words = text.split(' ');
        let currentText = '';
        let wordIndex = 0;

        // 초기 빈 메시지 생성
        const typingMessage = this.createChatBotMessage('');
        this.updateChatbotState(typingMessage);

        const typeNextWord = () => {
            if (wordIndex < words.length) {
                currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
                wordIndex++;

                // 마지막 메시지 업데이트
                this.setState((prevState) => {
                    const messages = [...prevState.messages];
                    const lastMessage = { ...messages[messages.length - 1] };
                    lastMessage.message = currentText;
                    messages[messages.length - 1] = lastMessage;

                    return {
                        ...prevState,
                        messages: messages
                    };
                });

                setTimeout(typeNextWord, speed);
            }
        };

        typeNextWord();
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
