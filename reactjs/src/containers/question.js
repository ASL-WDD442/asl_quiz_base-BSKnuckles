/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionContainer extends React.Component {
    state = {
      question: {},
      choices: [],
    }

    fetchQuestion = async (id) => {
      const question = await API.get(`/questions/${id}`);
      const choices = await API.get(`/choices?questionId=${id}`);
      this.setState({ question, choices });
    }

    saveQuestion = async (question) => {
      if (question.id) {
        return API.put(`/questions/${question.id}`, question);
      }
      return API.post('/questions', question);
    }

    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);
    }

    deleteChoice = async (id) => {
      await API.delete(`/choices/${id}`);
    }

    render() {
      const { question, choices } = this.state;
      return (
        <Component
          {...this.props}
          question={question}
          choices={choices}
          fetchQuestion={this.fetchQuestion}
          saveQuestion={this.saveQuestion}
          deleteQuestion={this.deleteQuestion}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };
}