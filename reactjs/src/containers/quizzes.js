/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    state = {
      userQuizzes: [],
      publicQuizzes: [],
    }

    fetchUserQuizzes = async () => {
      const userQuizzes = await API.get('/quizzes');
      this.setState({ userQuizzes });
    }

    fetchPublicQuizzes = async () => {
      const publicQuizzes = await API.get('/quizzes/public');
      this.setState({ publicQuizzes });
    }

    render() {
      const { userQuizzes, publicQuizzes } = this.state;
      return (
        <Component
          {...this.props}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          fetchPublicQuizzes={this.fetchPublicQuizzes}
          fetchUserQuizzes={this.fetchUserQuizzes}
        />
      );
    }
  };
}