import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Board from '../pages/Board';
import MainLayout from '../layouts/MainLayout';
import Community from '../pages/Community';
import Dataroom from '../pages/Dataroom';
import Map from '../pages/Map';
import DetailPage from '../pages/Detailpage';

const Approuter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Board" element={<Board />} />
                <Route path="/Community" element={<Community />} />
                <Route path="/Community/:id" element={<DetailPage />} />
                <Route path="/Dataroom" element={<Dataroom />} />
                <Route path="/Map" element={<Map />} />
            </Route>
        </Routes>
    );
};

export default Approuter;
