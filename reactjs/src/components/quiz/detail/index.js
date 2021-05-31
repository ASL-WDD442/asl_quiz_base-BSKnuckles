import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import Link from '../../link';
import styles from '../styles.module.css';
import QuizContainer from '../../../containers/quiz';

class QuizDetail extends React.Component {
  componentDidMount() {
    const { fetchQuiz, match: { params: { id } } } = this.props;
    fetchQuiz(id);
  }

  delete = async () => {
    const { deleteQuiz, quiz: { id } } = this.props;
    await deleteQuiz(id);
  }

  render() {
    const { quiz, questions } = this.props;
    return (
      <div>
        <div className={styles.heading}>
          <span>{quiz.name}</span>
          <span>
            <Link url={'/admin/quizzes/edit/' + quiz.id} title='Edit' icon='fa-edit' className='link' />
            <span onClick={this.delete} role="presentation">
              <Link url={'/admin/quizzes/'} title='Delete' icon='fa-trash' className='link linkSecondary' />
            </span>
          </span>
          <div>
            <h2 className={styles.headingSecondary}>Questions</h2>
            <ul className={styles.list}>
              {questions.map(question => (
                  <li className={styles.list__item} key={question.id}>
                  <span className={styles.list__item__title}>{question.title}</span>
                  <div className={styles.list__item_footer}>
                    <Link url={'/admin/questions/' + question.id} title='View' icon='fa-eye' className='link' />
                    <Link url={'/admin/questions/edit/' + question.id} title='Edit' icon='fa-edit' className='link' />
                    </div>
                  </li>
              ))}
            </ul>
            <Link url={`/admin/questions/new?quizId=${quiz.id}`} title='Add a new question' icon='' className='button primary' />
          </div>
        </div>
      </div>
    );
  }
};

QuizDetail.propTypes = {
  quiz: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string, type: PropTypes.string }),
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchQuiz: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
};

QuizDetail.defaultProps = {
  quiz: {},
  questions: [],
}

export default QuizContainer(QuizDetail);
