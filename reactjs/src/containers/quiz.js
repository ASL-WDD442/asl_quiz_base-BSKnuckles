/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizContainer extends React.Component {
    state = {
      quiz: {},
      questions: [],
    }

    fetchQuiz = async (id) => {
      const quiz = await API.get(`/quizzes/${id}`);
      const questions = await API.get(`/questions?quizId=${id}`)
      questions.forEach(async (question) => {
        question.choices = await API.get(`/choices?questionId=${question.id}`);
      })
      this.setState({ quiz, questions });
    }

    saveQuiz = async (quiz) => {
      if (quiz.id) {
        return API.put(`/quizzes/${quiz.id}`, quiz);
      }
      return API.post('/quizzes', quiz);
    }

    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);
    }

    render() {
      const { quiz, questions } = this.state;
      return (
        <Component
          {...this.props}
          quiz={quiz}
          questions={questions}
          fetchQuiz={this.fetchQuiz}
          saveQuiz={this.saveQuiz}
          deleteQuiz={this.deleteQuiz}
        />
      );
    }
  };
}