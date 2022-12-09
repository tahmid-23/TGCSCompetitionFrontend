import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add/Add';
import ExperienceOverview from './components/ExperienceOverview/ExperienceOverview';
import Home from './components/Home/Home';
import Update from './components/Update/Update';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
        <Route
          path="/example"
          element={
            <ExperienceOverview
              data={{ id: 69, name: 'Test', fee: 69, category: 'COMPETITION' }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
