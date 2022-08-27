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
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
    const { value, description, method, currency, tag } = this.state;
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
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            value={ currency }
            onInput={ this.onInputChange }
          >
            {
              currencies.map((item) => (
                <option key={ item } value={ item }>{ item }</option>))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          <strong>Método de pagamento: </strong>
          <select
            name="method"
            id="method-input"
            data-testid="method-input"
            value={ method }
            onInput={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <strong>Categoria: </strong>
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onInput={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
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
