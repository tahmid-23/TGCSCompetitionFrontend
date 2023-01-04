import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add/Add';
import AddCompetition from './components/Add/AddCompetition';
import AddProgram from './components/Add/AddProgram';
import ExperienceOverview from './components/Overview/ExperienceOverview/ExperienceOverview';
import Home from './components/Home/Home';
import Update from './components/Update/Update';
import './index.css';
import CompetitionOverview from './components/Overview/CompetitionOverview/CompetitionOverview';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import OverviewWrapper from './components/Overview/OverviewWrapper/OverviewWrapper';

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
        <Route path="/view/:experienceId" element={<OverviewWrapper />} />
        <Route path="/add_competition" element={<AddCompetition />} />
        <Route path="/add_program" element={<AddProgram />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
