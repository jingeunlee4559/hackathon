import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../css/Supportcard.css';

const supportData = [
    {
        title: '서울시 한부모가족 주거 지원 (2025년 3차)',
        applicationPeriod: '2025.09.01 ~ 2025.10.31',
        summary: '전월세 보증금 최대 6,000만원 무이자 융자 지원',
        tags: ['#서울시', '#주거지원', '#한부모', '#신청가능'],
    },
    {
        title: '서울시 한부모가족 주거 지원 (2025년 3차)',
        applicationPeriod: '2025.09.01 ~ 2025.10.31',
        summary: '전월세 보증금 최대 6,000만원 무이자 융자 지원',
        tags: ['#서울시', '#주거지원', '#한부모', '#신청가능'],
    },
    {
        title: '서울시 한부모가족 주거 지원 (2025년 3차)',
        applicationPeriod: '2025.09.01 ~ 2025.10.31',
        summary: '전월세 보증금 최대 6,000만원 무이자 융자 지원',
        tags: ['#서울시', '#주거지원', '#한부모', '#신청가능'],
    },
];

function SupportInfoSection() {
    return (
        <div className="support-section-background">
            <Container className="py-5">
                <Row>
                    {supportData.map((item, index) => (
                        <Col xs={12} sm={12} md={4} key={index}>
                            <Card className="support-card">
                                <Card.Header as="h5" className="support-card-header text-center">
                                    {item.title}
                                </Card.Header>
                                <Card.Body className="support-card-body">
                                    <div className="mb-3">
                                        <p className="support-card-text">
                                            <strong>신청 기간:</strong> {item.applicationPeriod}
                                        </p>
                                        <p className="support-card-text">
                                            <strong>핵심 요약:</strong> {item.summary}
                                        </p>
                                    </div>
                                    <div>
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="support-card-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default SupportInfoSection;
