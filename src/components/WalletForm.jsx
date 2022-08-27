import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchAPI from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      value: '',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          <strong>Valor: </strong>
          <input
            type="text"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onInput={ this.onInputChange }
          />
        </label>
        <label htmlFor="description-input">
          <strong>description: </strong>
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onInput={ this.onInputChange }
          />
        </label>
        <label htmlFor="currency-input">
          <strong>Moeda: </strong>
          <select
            name=""
            id="currency-input"
            data-testid="currency-input"
          >

            {
              currencies.map((item) => (
                <option key={ item } value={ item }>{ item }</option>))
            }
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string),
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(WalletForm);
