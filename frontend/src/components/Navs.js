import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Nav.css';
// import axios from '../axios';

function Navs() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const navigateTo = useCallback(
        (path) => {
            navigate(path);
            setExpanded(false);
        },
        [navigate],
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (location.pathname === '/') {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setIsScrolled(true);
        }
    }, [location.pathname]);

    return (
        <>
            <Navbar expand="lg" className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`} expanded={expanded}>
                <Container style={{ maxWidth: '80%' }}>
                    {' '}
                    {/* Changed maxWidth to 100% */}
                    <Navbar.Brand onClick={() => navigateTo('/')}>
                        <img src="img\mini2-icon.png" alt="로고" className="logo5" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto justify-content-center">
                            <Nav.Link onClick={() => navigateTo('/Community')}>커뮤니티</Nav.Link>
                            <Nav.Link onClick={() => navigateTo('/Dataroom')}>정보자료실</Nav.Link>
                            <Nav.Link onClick={() => navigateTo('/Map')}>기관찾기</Nav.Link>
                        </Nav>
                        <Nav className="align-items-center">
                            <Nav.Link onClick={() => navigateTo('/Mypage')}>마이페이지 </Nav.Link>
                            <Nav.Link>로그아웃</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navs;
