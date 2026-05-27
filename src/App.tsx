import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Concepts from './pages/Concepts';
import CodeTraining from './pages/CodeTraining';
import Recall from './pages/Recall';
import Drawing from './pages/Drawing';
import Design from './pages/Design';
import Sorting from './pages/Sorting';
import Mock from './pages/Mock';
import WrongBook from './pages/WrongBook';
import Review from './pages/Review';
import Sprint from './pages/Sprint';
import Memory from './pages/Memory';
import Onboarding from './pages/Onboarding';
import MindMap from './pages/MindMap';
import Practice from './pages/Practice';

export default function App() {
  return (
    <BrowserRouter basename="/ds-sprint-/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/concepts" element={<Concepts />} />
          <Route path="/code-training" element={<CodeTraining />} />
          <Route path="/recall" element={<Recall />} />
          <Route path="/drawing" element={<Drawing />} />
          <Route path="/design" element={<Design />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/mock" element={<Mock />} />
          <Route path="/wrong-book" element={<WrongBook />} />
          <Route path="/review" element={<Review />} />
          <Route path="/sprint" element={<Sprint />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/guide" element={<Onboarding />} />
          <Route path="/mind-maps" element={<MindMap />} />
          <Route path="/practice" element={<Practice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
