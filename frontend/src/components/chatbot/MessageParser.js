class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        // 모든 메시지를 API로 전송
        this.actionProvider.handleMessage(message);
    }
}

export default MessageParser;
