import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Link from '../link';
import QuizzesContainer from '../../containers/quizzes';

class Landing extends React.Component {
  componentDidMount() {
    const { fetchPublicQuizzes } = this.props;
    fetchPublicQuizzes();
  }

  render() {
    const { publicQuizzes } = this.props;
    return (
      <>
        <h1 className={styles.heading}>Welcome to Guitar Enigma!</h1>
        <h2 className={styles.headingSecondary}>Looking to improve your mastery of guitar-based trivia?</h2>
        <p>Check out the quizzes created by others below for a challenging and fun experience</p>
        <h2 className={styles.headingSecondary}>Want to test your friend's knowledge?</h2>
              <Link url='/admin/quizzes/new' title='Create Your Own Quiz' icon='' className='button primary' />
        <h1 className={styles.heading}>Public Quizzes</h1>
        <ul className={styles.list}>
            {publicQuizzes.map(quiz => (
              <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
                <Link url={`/quizzes/${quiz.id}`} title='View' icon='fa-eye' />
            </li>
            ))}
        </ul>
        <Link url='/admin/quizzes/new' title='Create Your Own Quiz' icon='' className='button primary' />
      </>
    );
  }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchPublicQuizzes: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  publicQuizzes: [],
};

export default QuizzesContainer(Landing);