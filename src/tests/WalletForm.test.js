import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const inputValueTestId = 'value-input';
const inputDescriptionTestId = 'description-input';
const inputCurrencyTestId = 'currency-input';
const inputMethodTestId = 'method-input';
const inputTagTestId = 'tag-input';

// const currencies = [
//   'USD',
//   'CAD',
//   'GBP',
//   'ARS',
//   'BTC',
//   'LTC',
//   'EUR',
//   'JPY',
//   'CHF',
//   'AUD',
//   'CNY',
//   'ILS',
//   'ETH',
//   'XRP',
//   'DOGE',
// ];

describe('testa o componente WalletForm', () => {
  it('Verifica se possui um campo para adicionar valor da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByTestId(inputValueTestId)).toBeInTheDocument();
  });
  it('Verifica se possui um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByTestId(inputDescriptionTestId)).toBeInTheDocument();
  });
  it('Verifica se possui um campo para selecionar em qual moeda será registrada a despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputCurrency = screen.getByTestId(inputCurrencyTestId);
    expect(inputCurrency).toBeInTheDocument();
  });
  it('Verifica se possui um campo para adicionar qual método de pagamento será utilizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputMethod = screen.getByTestId(inputMethodTestId);
    const [one, two, three] = inputMethod.options;
    expect(inputMethod).toBeInTheDocument();
    expect(inputMethod.options).toHaveLength(3);
    expect(one).toHaveTextContent('Dinheiro');
    expect(two).toHaveTextContent('Cartão de crédito');
    expect(three).toHaveTextContent('Cartão de débito');
  });
  it('Verifica se possui um campo para selecionar uma categoria (tag) para a despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputTag = screen.getByTestId(inputTagTestId);
    expect(inputTag).toBeInTheDocument();
    expect(inputTag.options).toHaveLength(5);
    expect(inputTag.options[0]).toHaveTextContent('Alimentação');
    expect(inputTag.options[1]).toHaveTextContent('Lazer');
    expect(inputTag.options[2]).toHaveTextContent('Trabalho');
    expect(inputTag.options[3]).toHaveTextContent('Transporte');
    expect(inputTag.options[4]).toHaveTextContent('Saúde');
  });
});
