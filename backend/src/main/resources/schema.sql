-- 데이터베이스 사용
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
CREATE INDEX idx_community_created_at ON community(created_at);
CREATE INDEX idx_comment_community_id ON comment(community_id);
CREATE INDEX idx_comment_created_at ON comment(comment_created_at);