-- MySQL hack 데이터베이스에 테이블 생성
USE hack;

-- Community 테이블 생성
CREATE TABLE IF NOT EXISTS community (
    community_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    writer VARCHAR(100) NOT NULL,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Comment 테이블 생성
CREATE TABLE IF NOT EXISTS comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    community_id INT NOT NULL,
    content TEXT NOT NULL,
    comments_writer VARCHAR(100) NOT NULL,
    comment_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES community(community_id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_community_created_at ON community(created_at);
CREATE INDEX IF NOT EXISTS idx_comment_community_id ON comment(community_id);
CREATE INDEX IF NOT EXISTS idx_comment_created_at ON comment(comment_created_at);

-- 샘플 데이터 삽입 (선택사항)
INSERT IGNORE INTO community (community_id, title, content, writer, view_count) VALUES
(1, '한부모가족 지원금 신청 방법 아시는 분?', '안녕하세요, 정부에서 지원하는 한부모가족 지원금 신청 절차나 필요 서류에 대해 알고 싶어요.', '용감한 엄마', 152),
(2, '아이랑 둘이서 갈만한 여행지 추천해주세요.', '3살 아이와 함께 휴식을 취할 수 있는 작은 여행을 계획 중입니다.', '희망아빠', 278),
(3, '정부 아이돌봄 서비스 이용 후기 공유해요.', '정부에서 운영하는 아이돌봄 서비스를 이용해 본 긍정적인 경험을 나누고 싶어요.', '쑥쑥이맘', 95);

SELECT 'Tables created successfully!' as message;