import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const inputValueTestId = 'value-input';
const inputDescriptionTestId = 'description-input';
const inputCurrencyTestId = 'currency-input';

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
});
