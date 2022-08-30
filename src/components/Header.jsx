import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.calculateExpense = this.calculateExpense.bind(this);
  }

  formatNumber(value) {
    const regExp = /^(\d+\.\d{2})/gm;
    if (!regExp.test(value)) return `${value}.00`;
    return `${value}`.match(regExp);
  }

  calculateExpense() {
    const { expenses } = this.props;
    if (expenses.length) {
      const totalExpense = expenses
        .reduce((total, { value, currency, exchangeRates }) => {
          const resulte = (value * (exchangeRates[currency].ask)) + total;
          return resulte;
        }, 0);
      return this.formatNumber(totalExpense);
    } return '0.00';
  }

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
            <p data-testid="total-field">{ this.calculateExpense() }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
  expenses: propTypes.arrayOf(propTypes.object),
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
