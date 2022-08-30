import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';

const inputValueTestId = 'value-input';
const inputDescriptionTestId = 'description-input';
const inputCurrencyTestId = 'currency-input';
const inputMethodTestId = 'method-input';
const inputTagTestId = 'tag-input';

const wallet = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
  },
};
const { wallet: { currencies } } = wallet;

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
    renderWithRouterAndRedux(<WalletForm />, { initialState: wallet });
    const inputCurrency = screen.getByTestId(inputCurrencyTestId);
    expect(inputCurrency).toBeInTheDocument();
    expect(inputCurrency.options).toHaveLength(currencies.length);
    expect(inputCurrency.options[0]).toHaveTextContent(currencies[0]);
    expect(inputCurrency.options[1]).toHaveTextContent(currencies[1]);
    expect(inputCurrency.options[2]).toHaveTextContent(currencies[2]);
    expect(inputCurrency.options[3]).toHaveTextContent(currencies[3]);
    expect(inputCurrency.options[4]).toHaveTextContent(currencies[4]);
    expect(inputCurrency.options[5]).toHaveTextContent(currencies[5]);
    expect(inputCurrency.options[6]).toHaveTextContent(currencies[6]);
    expect(inputCurrency.options[7]).toHaveTextContent(currencies[7]);
    expect(inputCurrency.options[8]).toHaveTextContent(currencies[8]);
    expect(inputCurrency.options[9]).toHaveTextContent(currencies[9]);
    expect(inputCurrency.options[10]).toHaveTextContent(currencies[10]);
    expect(inputCurrency.options[11]).toHaveTextContent(currencies[11]);
    expect(inputCurrency.options[12]).toHaveTextContent(currencies[12]);
    expect(inputCurrency.options[13]).toHaveTextContent(currencies[13]);
    expect(inputCurrency.options[14]).toHaveTextContent(currencies[14]);
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
