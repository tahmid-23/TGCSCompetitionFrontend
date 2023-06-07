import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddCompetitionForm from '../Add/AddCompetitionForm/AddCompetitionForm';
import AddForm from '../Add/AddForm';
import AddProgramForm from '../Add/AddProgramForm/AddProgramForm';
import Admin from '../Admin/Admin';
import EditCompetitionForm from '../Edit/EditCompetitionForm/EditCompetitionForm';
import EditForm from '../Edit/EditForm';
import EditProgramForm from '../Edit/EditProgramForm/EditProgramForm';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Token from '../Token/Token';
import OverviewWrapper from '../Overview/OverviewWrapper/OverviewWrapper';
import styles from './App.module.css';
import { PaletteMode } from '@mui/material';
import Header from '../Header/Header';

interface AppProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

const App = ({ mode, setMode }: AppProps) => {
  return (
    <BrowserRouter>
      <Header mode={mode} setMode={setMode} />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/edit/:experienceId" element={<EditForm />} />
          <Route path="/view/:experienceId" element={<OverviewWrapper />} />
          <Route
            path="/add-competition/:competitionId"
            element={<AddCompetitionForm />}
          />
          <Route path="/add-program/:programId" element={<AddProgramForm />} />
          <Route
            path="/edit-competition/:competitionId"
            element={<EditCompetitionForm />}
          />
          <Route
            path="/edit-program/:programId"
            element={<EditProgramForm />}
          />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/token" element={<Token />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
