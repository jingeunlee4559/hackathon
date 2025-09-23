class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('안녕')) {
            this.actionProvider.greet();
        } else if (lowerCaseMessage.includes('지원') || lowerCaseMessage.includes('정책')) {
            this.actionProvider.handleSupportInquiry();
        } else if (lowerCaseMessage.includes('힘들') || lowerCaseMessage.includes('우울')) {
            this.actionProvider.handleEmotionalSupport();
        } else {
            this.actionProvider.handleUnknown();
        }
    }
}

export default MessageParser;
