import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from './styles.module.css';
import QuizContainer from '../../containers/quiz';

class Quiz extends React.Component {
  componentDidMount() {
    const { fetchQuiz, match: { params: { id } } } = this.props;
    fetchQuiz(id);
  }

  render() {
    const { quiz, questions } = this.props;
    return (
      <div>
        <h1 className={styles.heading}>{ quiz.name }</h1>
          <div>
            <h2 className={styles.headingSecondary}>Questions</h2>
            {questions && (
              <ul className={styles.list}>
                {questions.map(question => (
                  <li className={styles.list__item} key={question.id}>
                    <span className={styles.list__item__title}>{question.title}</span>
                    <p>{ question['choices'] }</p>
                    {question.choices && (
                      <div className={styles.list__item_footer}>
                        {question.choices.map(choice => (
                          <button class="button active">{ choice.value }</button>
                        ))}    
                      </div>
                    )}
                </li>
              ))
              }
            </ul>
          )}
          </div>
      </div>
    );
  }
};

Quiz.propTypes = {
  quiz: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string, type: PropTypes.string }),
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuiz: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  quiz: {},
  questions: [],
}

export default QuizContainer(Quiz);
