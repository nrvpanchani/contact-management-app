import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const ContactList = lazy(() => import('./components/ContactList'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const LineGraph = lazy(() => import('./components/LineGraph'));
const Map = lazy(() => import('./components/Map'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
          <Route path="/graph" element={<LineGraph />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
