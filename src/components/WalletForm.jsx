import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchAPI, { walletFetchAPI, saveEditAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.addValue = this.addValue.bind(this);
    this.editExpense = this.editExpense.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      wasCalled: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  componentDidUpdate() {
    const { wasCalled } = this.state;
    const { editor } = this.props;

    if (editor && !wasCalled) {
      console.log('ok');
      this.addValue();
    }
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onClickButton() {
    const { editor } = this.props;
    if (editor) this.editExpense();
    else this.addExpense();
  }

  addExpense() {
    const { expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const obj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(walletFetchAPI(obj));
    this.setState({ value: '', description: '' });
  }

  editExpense() {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const expenseIndex = expenses.indexOf(expenses.find(({ id }) => id === idToEdit));
    expenses[expenseIndex].value = value;
    expenses[expenseIndex].description = description;
    expenses[expenseIndex].method = method;
    expenses[expenseIndex].currency = currency;
    expenses[expenseIndex].tag = tag;
    dispatch(saveEditAction({ expenses, editor: false, idToEdit: 0 }));
    this.setState({ wasCalled: false });
  }

  addValue() {
    const { expenses, idToEdit } = this.props;
    const expense = expenses.find(({ id }) => id === idToEdit);
    const { value, description, currency, method, tag } = expense;
    this.setState({ ...{ value, description, currency, method, tag }, wasCalled: true });
  }

  render() {
    const { value, description, method, currency, tag } = this.state;
    const { currencies, editor } = this.props;
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
        <button
          type="button"
          onClick={ this.onClickButton }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string),
  dispatch: propTypes.func,
  expenses: propTypes.arrayOf({}),
  editor: propTypes.bool,
  idToEdit: propTypes.number,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(WalletForm);
