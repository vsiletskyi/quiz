import './App.css';
import Quiz from './containers/Quize/Quiz-func';
import Layout from './hoc/Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
      </Routes>
    </Layout>
  );
}

export default App;
