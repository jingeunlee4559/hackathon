import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/Main.css';
import ServiceCards from '../components/ServiceCards';
import SupportInfoSection from '../components/SupportInfoCard';

const Home = () => {
    return (
        <>
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col>
                        <div className="video-container">
                            <img src="/img/mainimg.png" className="video-content" />
                            <div className="video-overlay">
                                <h1>혼자라고 느끼지 않도록, 당신 곁에 있을게요.</h1>
                                <p>미혼모와 미혼부를 위한 따뜻한 정보 커뮤니티 '품다'에서 함께해요.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="my-5">
                <Row>
                    <Col>
                        <h3 style={{ fontWeight: 'bold' }}> 지원정보</h3>
                    </Col>
                </Row>
                <SupportInfoSection />
                <Row className="my-5">
                    <Col>
                        <h3 style={{ fontWeight: 'bold' }}> 서비스 소개</h3>
                    </Col>
                </Row>
                <ServiceCards />
            </Container>
        </>
    );
};

export default Home;
