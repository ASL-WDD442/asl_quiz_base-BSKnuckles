import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/header';
import Login from './components/login';
import Signup from './components/signup';
import QuizList from './components/quiz/list';
import Landing from './components/landing';
import QuizDetail from './components/quiz/detail';
import QuizForm from './components/forms/quiz';
import QuestionDetail from './components/question/detail';
import QuestionForm from './components/forms/question';
import ChoiceForm from './components/forms/choice';
import Quiz from './components/quiz';

function App() {
  return (
    <Router>
      <Route path='/' component={Header} />
      <main className={styles.main__container}>
        <Route path='/' exact component={Landing} />
        <Route path="/quizzes/:id" exact component={Quiz} />
        <Route path='/google/callback' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path="/admin/quizzes" exact component={QuizList} />

        <Switch>
          <Route path="/admin/quizzes/new" exact component={QuizForm} />
          <Route path="/admin/quizzes/edit/:id" exact component={QuizForm} />
          <Route path="/admin/quizzes/:id" exact component={QuizDetail} />

          <Route path="/admin/questions/new" exact component={QuestionForm} />
          <Route path="/admin/questions/edit/:id" exact component={QuestionForm} />
          <Route path="/admin/questions/:id" exact component={QuestionDetail} />

          <Route path="/admin/choices/new" exact component={ChoiceForm} />
          <Route path="/admin/choices/edit/:id" exact component={ChoiceForm} />
        </Switch>
      </main>
    </Router>      
  );
}

export default App;
