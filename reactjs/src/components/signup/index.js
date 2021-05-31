import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';

class Signup extends React.Component {
  componentDidMount() {

  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/admin/quizzes" />
    return (
      <>
        <h1 className={styles.heading}>Sign Up</h1>
        <form method="POST" className={styles.form}>
          <label className={styles.form__label}>Name
              <input type="text" name="name" className={styles.form__input}></input>
            </label>
            <label className={styles.form__label}>Email
              <input type="email" name="email" className={styles.form__input}></input>
            </label>
            <label className={styles.form__label}>Password
              <input type="password" name="password" className={styles.form__input}></input>
            </label>
            <button type="submit" className={[styles.button,styles.active].join(' ')}>Sign Up</button>
          </form>
        </>
    )
  }
}

Signup.propTypes = {
  loggedIn: PropTypes.bool,
};

Signup.defaultProps = {
  loggedIn: false,
};

export default AuthContainer(Signup);