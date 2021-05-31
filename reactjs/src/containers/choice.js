/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class ChoiceContainer extends React.Component {
    state = {
      choice: {},
    }

    fetchChoice = async (id) => {
      const choice = await API.get(`/choices/${id}`);
      this.setState({ choice });
    }

    saveChoice = async (choice) => {
      if (choice.id) {
        return API.put(`/choices/${choice.id}`, choice);
      }
      return API.post('/choices', choice);
    }

    deleteChoice = async (id) => {
      await API.delete(`/choices/${id}`);
    }

    render() {
      const { choice } = this.state;
      return (
        <Component
          {...this.props}
          choice={choice}
          fetchChoice={this.fetchChoice}
          saveChoice={this.saveChoice}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };
}