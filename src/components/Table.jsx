import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.css';

class Table extends Component {
  render() {
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
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(Table);
