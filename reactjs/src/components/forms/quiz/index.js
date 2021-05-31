import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../../containers/quiz';

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      userId: undefined,
    }
  }

  componentDidMount() {
    const { fetchQuiz, match: { params: { id } } } = this.props;
    if (id) fetchQuiz(id);
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    event.preventDefault();
    const { quiz: { id, userId }, saveQuiz, history } = this.props;
    const { name, type = 'public' } = this.state;
    const data = await saveQuiz({ id, name, type, userId });
    history.push(`/admin/quizzes/${data.id}`);
  }

  render() {
    const { quiz: { id, name: defaultName = '', type: defaultType = 'public' } } = this.props;
    const { name = defaultName, type = defaultType } = this.state;

    return(
      <>
        <h1 className={styles.heading}>{id ? 'Edit Quiz' : 'New Quiz'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="name">Quiz Name
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              className={styles.form__input}
              onChange={this.handleInputChange} />
          </label>
          <label className={styles.form__label} htmlFor="type">
            <span className={styles.form__labelInline}>Quiz Type</span>
            <label className={styles.form__labelInline}>
              <input
                type="radio"
                name="type"
                value="public"
                id="type"
                checked={type === 'public'}
                className={styles.form__input__radio}
                onChange={this.handleInputChange} />
              <span>Public</span>
            </label>
            <label className={styles.form__labelInline} htmlFor="type">
              <input
                type="radio"
                name="type"
                value="private"
                id="type"
                checked={type === 'private'}
                className={styles.form__input__radio}
                onChange={this.handleInputChange} />
              <span>Private</span>
            </label>
          </label>
          <button type="submit" className={[styles.button,styles.active].join(' ')}>{name ? 'Save Quiz' : 'Create Quiz'}</button>
        </form>  
      </>
    )
  }
}

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  }),
  saveQuiz: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};
QuizForm.defaultProps = {
  quiz: {},
}

export default QuizContainer(QuizForm);