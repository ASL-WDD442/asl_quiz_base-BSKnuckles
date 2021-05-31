import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuestionContainer from '../../../containers/question';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      quizId: undefined,
    }
  }

  componentDidMount() {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    if (id) fetchQuestion(id);
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    event.preventDefault();
    let { question: { id, quizId }, saveQuestion, history, location } = this.props;
    const { title } = this.state;
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      quizId = queryParams.get('quizId');
    }
    const data = await saveQuestion({ id, title, quizId });
    history.push(`/admin/questions/${data.id}`);
  }

  render() {
    const { question: { id, title: defaultTitle = '' } } = this.props;
    const { title = defaultTitle } = this.state;

    return(
      <>
        <h1 className={styles.heading}>{id ? 'Edit Question' : 'New Question'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="title">Question Title
            <input
              type="text"
              name="title"
              value={title}
              id="title"
              className={styles.form__input}
              onChange={this.handleInputChange} />
          </label>
          <button type="submit" className={[styles.button,styles.active].join(' ')}>{title ? 'Save Question' : 'Create Question'}</button>
        </form>  
      </>
    )
  }
}

QuestionForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  saveQuestion: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};
QuestionForm.defaultProps = {
  question: {},
}

export default QuestionContainer(QuestionForm);