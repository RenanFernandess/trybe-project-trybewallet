import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonIsDisabled: true,
    };
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const passwordMinCharacters = 6;
      const emailRegex = /^\w+[@]{1}[a-z]+\.com{1}$/g;
      const buttonIsDisabled = (
        password.length < passwordMinCharacters
        || !emailRegex.test(email)
      );
      this.setState({ buttonIsDisabled });
    });
  }

  onClickButton() {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userAction({ email }));
    history.push('/carteire');
  }

  render() {
    const { email, password, buttonIsDisabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email-input">
            <strong>Email</strong>
            <input
              type="email"
              name="email"
              value={ email }
              id="email-input"
              onInput={ this.onInputChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            <strong>Senha</strong>
            <input
              type="text"
              name="password"
              id="password-input"
              data-testid="password-input"
              value={ password }
              onInput={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            disabled={ buttonIsDisabled }
            onClick={ this.onClickButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Login);
