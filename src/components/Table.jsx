import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';
import propTypes from 'prop-types';
import { deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  formatNumber(value) {
    const regExp = /^(\d+\.\d{2})/gm;
    if (!regExp.test(value)) return `${value}.00`;
    return `${value}`.match(regExp);
  }

  deleteExpense({ target: { name } }) {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter(({ id }) => id !== Number(name));
    dispatch(deleteExpenseAction(newExpenses));
  }

  render() {
    const { expenses } = this.props;

    return (
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {
            expenses.length
              ? expenses
                .map((
                  { id, value, description, currency, method, tag, exchangeRates },
                ) => {
                  const { [currency]: { name, ask } } = exchangeRates;

                  return (
                    <tr key={ id }>
                      <td>{ description }</td>
                      <td>{ tag }</td>
                      <td>{ method }</td>
                      <td>{ Number(value).toFixed(2) }</td>
                      <td>{ name }</td>
                      <td>{ Number(ask).toFixed(2) }</td>
                      <td>{ this.formatNumber(value * ask) }</td>
                      <td>Real</td>
                      <td>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          name={ id }
                          onClick={ this.deleteExpense }
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  );
                })
              : <tr />
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object),
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(Table);
