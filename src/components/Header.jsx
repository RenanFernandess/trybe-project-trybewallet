import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        Header
        <br />
        <div>
          <strong>Email:</strong>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p>Despesa total: R$</p>
          <p data-testid="total-field">{ 0 }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps)(Header);
