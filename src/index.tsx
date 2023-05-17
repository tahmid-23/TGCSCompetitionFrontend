import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add/Add';
import AddCompetition from './components/Add/AddCompetition';
import AddProgram from './components/Add/AddProgram';
import Edit from './components/Edit/Edit';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Home from './components/Home/Home';
import OverviewWrapper from './components/Overview/OverviewWrapper/OverviewWrapper';
import RecommendationWrapper from './components/Recommendation/RecommendationWrapper';
import './index.css';
import EditCompetition from './components/Edit/EditCompetition';
import EditProgram from './components/Edit/EditProgram';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Token from './components/Login/Token';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:experienceId" element={<Edit />} />
        <Route path="/view/:experienceId" element={<OverviewWrapper />} />
        <Route path="/add-competition" element={<AddCompetition />} />
        <Route path="/add-program" element={<AddProgram />} />
        <Route
          path="/edit-competition/:competitionId"
          element={<EditCompetition />}
        />
        <Route path="/edit-program/:programId" element={<EditProgram />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/recommendation" element={<RecommendationWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/token" element={<Token />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
