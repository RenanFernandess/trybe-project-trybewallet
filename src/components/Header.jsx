import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        Header
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
