import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import EventDetails from './EventDetails';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App initialPage="home" />} />
        
        {/* Events page */}
        <Route path="/events" element={<App initialPage="events" />} />
        
        {/* Team page */}
        <Route path="/team" element={<App initialPage="team" />} />
        
        {/* Team ChromaGrid page */}
        <Route path="/team-chroma" element={<App initialPage="team-chroma" />} />
        
        {/* About page */}
        <Route path="/about" element={<App initialPage="about" />} />
        
        {/* Registration page */}
        <Route path="/registration" element={<App initialPage="registration" />} />
        
        {/* Bug Bounty Registration page */}
        <Route path="/bug-bounty-registration" element={<App initialPage="bug-bounty-registration" />} />
        
        {/* Vibe Coding Registration page */}
        <Route path="/vibe-coding-registration" element={<App initialPage="vibe-coding-registration" />} />
        
        {/* Event details page */}
        <Route path="/event-details" element={<EventDetails />} />
        
        {/* 404 page */}
        <Route path="/404" element={<App initialPage="404" />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
