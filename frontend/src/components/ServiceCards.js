import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsMap, BsChatDots, BsRobot, BsCollection } from 'react-icons/bs';

import '../css/ServiceCards.css';

const cardData = [
    {
        icon: BsChatDots,
        title: '커뮤니티',
        text: '비슷한 경험을 가진 사람들과 소통하세요.',
        link: '/community',
    },
    {
        icon: BsCollection,
        title: '정보 자료실',
        text: '유용한 정보와 자료를 한눈에 확인하세요.',
        link: '/resources',
    },

    {
        icon: BsMap,
        title: '지도',
        text: '가장 가까운 지원 시설을찾습니다',
        link: '/support',
    },
    {
        icon: BsRobot,
        title: '챗봇 상담',
        text: '궁금한 내용을 챗봇에게 바로 물어보세요.',
        link: '/chatbot',
    },
];

const ServiceCards = () => {
    const navigate = useNavigate();

    return (
        <Row>
            {cardData.map((item, index) => {
                const IconComponent = item.icon;

                return (
                    <Col key={index} xs={12} sm={6} md={3} className="mb-4">
                        <Card className="shadow-sm h-100 text-center service-card" onClick={() => navigate(item.link)}>
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
                                <IconComponent className="card-icon mb-4" />
                                <Card.Title className="fw-bold">{item.title}</Card.Title>
                                <Card.Text className="text-muted">{item.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default ServiceCards;
