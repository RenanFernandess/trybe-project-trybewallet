import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="display">
        Header
        <br />
        <section className="display gap-15">
          <div className="display gap-5">
            <strong>Email:</strong>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="display gap-5">
            <p>Despesa total: R$</p>
            <p data-testid="total-field">{ 0 }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
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
