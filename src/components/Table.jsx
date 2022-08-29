import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';
import propTypes from 'prop-types';

class Table extends Component {
  formatNumber(value) {
    const regExp = /^(\d+\.\d{2})/gm;
    if (!regExp.test(value)) return `${value}.00`;
    return `${value}`.match(regExp);
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
                  { value, description, currency, method, tag, exchangeRates },
                  index,
                ) => {
                  const { [currency]: { name, ask } } = exchangeRates;

                  return (
                    <tr key={ index }>
                      <td>{ description }</td>
                      <td>{ tag }</td>
                      <td>{ method }</td>
                      <td>{ Number(value).toFixed(2) }</td>
                      <td>{ name }</td>
                      <td>{ Number(ask).toFixed(2) }</td>
                      <td>{ this.formatNumber(value * ask) }</td>
                      <td>Real</td>
                      <td>{}</td>
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
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(Table);
