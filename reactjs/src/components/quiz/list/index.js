import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css'
import Link from '../../link';
import QuizzesContainer from '../../../containers/quizzes';

class QuizList extends React.Component {
  componentDidMount() {
    const { fetchUserQuizzes } = this.props;
    fetchUserQuizzes();
  }

  render() {
    const { userQuizzes } = this.props;
    return (
      <>
        <h1 className={styles.heading}>My Quizzes</h1>
            <ul className={styles.list}>
                {userQuizzes.map((quiz) => (
                  <li className={styles.list__item} key={quiz.id}>
                  <span className={styles.list__item__title}>{quiz.name}</span>
                    <div className={styles.list__item__footer}>
                      <Link url={`/quizzes/${quiz.id}`} title="Quiz View" icon="fa-eye" />
                      <Link url={`/admin/quizzes/${quiz.id}`} title="Details" icon="fa-eye" />
                      <Link url={`/admin/quizzes/edit/${quiz.id}`} title="Edit" icon="fa-edit" />
                      <Link url={`/admin/quizzes/delete/${quiz.id}`} title="Delete" icon="fa-trash" className="link linkSecondary" />
                  </div>
                </li>
                ))}

            </ul>
        <Link url={'/admin/quizzes/new'} title='Create Your Own Quiz' icon='' className='button primary' />
      </>
    );
  }
}

QuizList.propTypes = {
  userQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchUserQuizzes: PropTypes.func.isRequired,
};

QuizList.defaultProps = {
  userQuizzes: [],
};

export default QuizzesContainer(QuizList);
