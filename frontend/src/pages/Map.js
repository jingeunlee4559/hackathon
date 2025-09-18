import React, { useEffect, useState } from 'react';
import { Container, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import '../css/Map.css';

const { kakao } = window;

const Map = () => {
    const locations = [
        { title: '미래아동병원', address: '광주광역시 남구 대남대로 1311', lat: 35.1337274, lng: 126.9107329, category: '아동병원' },
        { title: '예사랑아동병원', address: '광주광역시', lat: 35.1200815, lng: 126.8986162, category: '아동병원' },
        { title: '화정아동병원', address: '광주광역시 서구 화운로 129 화정아동병원', lat: 35.1505159, lng: 126.877702, category: '아동병원' },
        { title: '동구청', address: '광주 동구 서남로 1', lat: 35.1459525, lng: 126.9231488, category: '기관' },
        { title: '동구 보건소', address: '광주 동구 서남로 1', lat: 35.145627, lng: 126.9231689, category: '기관' },
        { title: '동명동 주민센터', address: '광주광역시 동구 동명로26번길 13', lat: 35.1511865, lng: 126.92515, category: '기관' },
        { title: '푸른마을 복지센터', address: '광주 동구 장동로 23', lat: 35.1515, lng: 126.9198, category: '복지센터' },
        { title: '희망나눔 복지센터', address: '광주 동구 필문대로 55', lat: 35.1455, lng: 126.9176, category: '복지센터' },
    ];

    const [activeCategory, setActiveCategory] = useState('all');
    const categories = ['all', '아동병원', '기관', '복지센터'];
    const categoryNames = {
        all: '전체',
        아동병원: '아동병원',
        기관: '기관',
        복지센터: '복지센터',
    };

    const markerImageSrc = {
        아동병원: '/img/marker1.png',
        기관: '/img/marker2.png',
        복지센터: '/img/marker3.png',
        default: '/img/marker1.png',
    };
    const markerImageSize = new kakao.maps.Size(36, 36);

    useEffect(() => {
        const mapContainer = document.getElementById('kakao-map');
        const mapOption = {
            center: new kakao.maps.LatLng(35.1491, 126.9204),
            level: 6,
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        let currentOverlay = null;

        const closeOverlay = () => {
            if (currentOverlay) {
                currentOverlay.setMap(null);
            }
        };

        const filteredLocations = activeCategory === 'all' ? locations : locations.filter((loc) => loc.category === activeCategory);

        filteredLocations.forEach((loc) => {
            const markerPosition = new kakao.maps.LatLng(loc.lat, loc.lng);

            const imageUrl = activeCategory === 'all' ? markerImageSrc[loc.category] || markerImageSrc.default : markerImageSrc[activeCategory] || markerImageSrc.default;

            const markerImage = new kakao.maps.MarkerImage(imageUrl, markerImageSize, { offset: new kakao.maps.Point(18, 36) });

            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
            });
            marker.setMap(map);

            const content = `
                <div class="custom-overlay">
                    <div class="info">
                        <div class="title">${loc.title}</div>
                        <div class="address">${loc.address}</div>
                    </div>
                    <div class="actions">
                        <a href="https://map.kakao.com/link/to/${loc.title},${loc.lat},${loc.lng}" target="_blank" rel="noopener noreferrer">길찾기</a>
                        <a href="#" class="homepage-btn">홈페이지</a>
                    </div>
                    <div class="close" title="닫기"></div>
                </div>`;

            const overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: marker.getPosition(),
                yAnchor: 1.2,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                closeOverlay();
                overlay.setMap(map);
                currentOverlay = overlay;

                const closeBtn = overlay.a.querySelector('.close');
                closeBtn.onclick = () => closeOverlay();

                const homepageBtn = overlay.a.querySelector('.homepage-btn');
                homepageBtn.onclick = (e) => {
                    e.preventDefault();
                    alert('홈페이지는 준비중입니다.');
                };
            });
        });
    }, [activeCategory]);

    return (
        <Container className="my-5">
            <Row className="mt-5"></Row>
            <Row className="my-5">
                <Col className="d-flex justify-content-left">
                    <h3 style={{ fontWeight: 'bold' }}>기관찾기</h3>
                </Col>
            </Row>
            <ButtonGroup className="mb-4 category-buttons">
                {categories.map((category) => (
                    <Button key={category} variant={activeCategory === category ? 'custom-active' : 'outline-secondary'} onClick={() => setActiveCategory(category)}>
                        {categoryNames[category]}
                    </Button>
                ))}
            </ButtonGroup>
            <div id="kakao-map" style={{ width: '100%', height: '500px', borderRadius: '8px' }}></div>
        </Container>
    );
};

export default Map;
