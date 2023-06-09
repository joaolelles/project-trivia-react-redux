import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.dataValidation());
  };

  dataValidation = () => {
    const { email, name } = this.state;

    let emailValidation = false;

    // the email validation was found at:
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex)) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }

    const minLength = 1;
    const nameValidation = name.length >= minLength;

    const validation = (emailValidation && nameValidation);

    this.setState({
      isDisabled: !validation,
    });

    return validation;
  };

  render() {
    const { isDisabled, email, name } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            type="text"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            value={ email }
          />
          <input
            name="name"
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            value={ name }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.score,
  gravatarEmail: globalState.gravatarEmail,
});

export default connect(mapStateToProps)(Login);
