import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddForm from './components/Add/AddForm';
import AddCompetitionForm from './components/Add/AddCompetitionForm/AddCompetitionForm';
import AddProgramForm from './components/Add/AddProgramForm/AddProgramForm';
import EditForm from './components/Edit/EditForm';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import Home from './components/Home/Home';
import OverviewWrapper from './components/Overview/OverviewWrapper/OverviewWrapper';
import RecommendationWrapper from './components/Recommendation/RecommendationWrapper';
import './index.css';
import EditCompetitionForm from './components/Edit/EditCompetitionForm/EditCompetitionForm';
import EditProgramForm from './components/Edit/EditProgramForm/EditProgramForm';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Token from './components/Login/Token';
import { Header } from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddForm />} />
            <Route path="/edit/:experienceId" element={<EditForm />} />
            <Route path="/view/:experienceId" element={<OverviewWrapper />} />
            <Route path="/add-competition" element={<AddCompetitionForm />} />
            <Route path="/add-program" element={<AddProgramForm />} />
            <Route
              path="/edit-competition/:competitionId"
              element={<EditCompetitionForm />}
            />
            <Route
              path="/edit-program/:programId"
              element={<EditProgramForm />}
            />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/recommendation" element={<RecommendationWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/token" element={<Token />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);
