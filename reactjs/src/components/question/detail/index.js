import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import Link from '../../link';
import styles from '../styles.module.css';
import QuestionContainer from '../../../containers/question';

class QuestionDetail extends React.Component {
  componentDidMount() {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    fetchQuestion(id);
  }

  delete = async () => {
    const { deleteQuestion, question: { id } } = this.props;
    await deleteQuestion(id);
  }

  render() {
    const { question, choices } = this.props;
    return (
      <div>
        <div className={styles.heading}>
          <span>{question.title}</span>
          <span>
            <Link url={'/admin/questions/edit/' + question.id} title='Edit' icon='fa-edit' className='link' />
            <span onClick={this.delete} role="presentation">
              <Link url={'/admin/quizzes/' + question.quizId} title='Delete' icon='fa-trash' className='link linkSecondary' />
            </span>
          </span>
          <div>
            <h2 className={styles.headingSecondary}>Choices</h2>
            <ul className={styles.list}>
              {choices.map(choice => (
                  <li className={styles.list__item} key={choice.id}>
                  <span className={styles.list__item__title}>{choice.value}</span>
                  <div className={styles.list__item_footer}>
                    <Link url={'/admin/choices/edit/' + choice.id} title='Edit' icon='fa-edit' className='link' />
                    </div>
                  </li>
              ))}
            </ul>
            <Link url={`/admin/choices/new?questionId=${question.id}`} title='Add a new choice' icon='' className='button primary' />
          </div>
        </div>
      </div>
    );
  }
};

QuestionDetail.propTypes = {
  question: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string, quizId: PropTypes.string }),
  choices: PropTypes.arrayOf(PropTypes.object),
  fetchQuestion: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

QuestionDetail.defaultProps = {
  question: {},
  choices: [],
}

export default QuestionContainer(QuestionDetail);
