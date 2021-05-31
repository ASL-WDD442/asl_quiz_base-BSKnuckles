import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';

class Login extends React.Component {
  componentDidMount() {
    const { location, verifyGoogleCode } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) verifyGoogleCode(code);
  }

  redirectToGoogle = () => {
    let GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
    GOOGLE_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
    GOOGLE_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
    GOOGLE_URL += '&response_type=code';
    GOOGLE_URL += '&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    window.location = GOOGLE_URL;
  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/admin/quizzes" />
    return (
      <>
        <h1 className={styles.heading}>Login</h1>
        <form method="POST" className={styles.form}>
          <label className={styles.form__label}>Email
            <input type="email" name="email" className={styles.form__input}></input>
          </label>
          <label className={styles.form__label}>Password
            <input type="password" name="password" className={styles.form__input}></input>
          </label>
          <button type="submit" className={[styles.button,styles.active].join(' ')}>Login</button>
        </form>
        <div>
          <h2>Social Login</h2>
          <button onClick={this.redirectToGoogle} className={styles.button}>
            <i className="fab fa-google"></i>
            <span>Login with Google</span>
          </button>
        </div>
      </>
    )
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  verifyGoogleCode: PropTypes.func.isRequired,
  location: RRPropTypes.location.isRequired,
};

Login.defaultProps = {
  loggedIn: false,
};

export default AuthContainer(Login);