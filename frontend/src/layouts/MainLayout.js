import React from 'react';
import { Outlet } from 'react-router-dom';
import Navs from '../components/Navs';
import Footer from '../components/Footer';
import PoomdaChatbot from '../components/chatbot/PoomdaChatbot';

const MainLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navs />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <PoomdaChatbot />
            <Footer />
        </div>
    );
};

export default MainLayout;
