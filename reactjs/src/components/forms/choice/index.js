import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import ChoiceContainer from '../../../containers/choice';

class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      type: undefined,
      questionId: undefined,
    }
  }

  componentDidMount() {
    const { fetchChoice, match: { params: { id } } } = this.props;
    if (id) fetchChoice(id);
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    event.preventDefault();
    let { choice: { id, questionId }, saveChoice, history, location } = this.props;
    const { value, type = 'correct' } = this.state;
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      questionId = queryParams.get('questionId');
    }
    await saveChoice({ id, value, type, questionId });
    history.push(`/admin/questions/${questionId}`);
  }

  render() {
    const { choice: { id, value: defaultValue = '', type: defaultType = 'correct' } } = this.props;
    const { value = defaultValue, type = defaultType } = this.state;

    return(
      <>
        <h1 className={styles.heading}>{id ? 'Edit Choice' : 'New Choice'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="value">Choice Value
            <input
              type="text"
              name="value"
              value={value}
              id="value"
              required
              className={styles.form__input}
              onChange={this.handleInputChange} />
          </label>
          <label className={styles.form__label} htmlFor="type">
            <span className={styles.form__labelInline}>Quiz Type</span>
            <label className={styles.form__labelInline}>
              <input
                type="radio"
                name="type"
                value="correct"
                id="type"
                checked={type === 'correct'}
                className={styles.form__input__radio}
                onChange={this.handleInputChange} />
              <span>Correct</span>
            </label>
            <label className={styles.form__labelInline} htmlFor="type">
              <input
                type="radio"
                name="type"
                value="incorrect"
                id="type"
                checked={type === 'incorrect'}
                className={styles.form__input__radio}
                onChange={this.handleInputChange} />
              <span>Incorrect</span>
            </label>
          </label>
          <button type="submit" className={[styles.button,styles.active].join(' ')}>{id ? 'Save Choice' : 'Create Choice'}</button>
        </form>  
      </>
    )
  }
}

ChoiceForm.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  }),
  saveChoice: PropTypes.func.isRequired,
  fetchChoice: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};
ChoiceForm.defaultProps = {
  choice: {},
}

export default ChoiceContainer(ChoiceForm);