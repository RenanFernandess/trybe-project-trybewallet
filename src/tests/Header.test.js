import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import Header from '../components/Header';

const emailFieldTestId = 'email-field';
const totalFieldTestId = 'total-field';
const headerCurrencyFieldTestId = 'header-currency-field';
const user = { user: { email: 'xablau@gmail.com' } };
const { user: { email } } = user;
const expectedValue = '784.26';
const wallet = {
  wallet: {
    expenses: [
      {
        id: 0,
        value: '40',
        description: 'Chinelo quadrado',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '90',
        description: 'Academia',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '35',
        description: 'Hamburgão ',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
  },
};

describe('Testa o componente Header', () => {
  it('Verifica se possui um elemento que exiba o e-mail da pessoa usuária que fez login', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByTestId(emailFieldTestId)).toBeInTheDocument();
  });
  it('Verifica se possui um elemento com a despesa total gerada pela lista de gastos', () => {
    renderWithRouterAndRedux(<Wallet />);
    const field = screen.getByTestId(totalFieldTestId);
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent('0');
  });
  it('Verifica se possui um elemento que mostre qual câmbio está sendo utilizado, que neste caso será "BRL"', () => {
    renderWithRouterAndRedux(<Wallet />);
    const field = screen.getByTestId(headerCurrencyFieldTestId);
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent('BRL');
  });
  it('Verifica se o e-mail que a pessoa usuária utilizou para fazer login é exibido na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: user });
    const emailElement = screen.getByTestId(emailFieldTestId);
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(email);
  });
  it('Verifica se o Verifica se o valor total é atualizado e possui o formato correto com apenas duas casas decimais apos o ponto "0.00"', () => {
    renderWithRouterAndRedux(<Header />, { initialState: wallet });
    const totalField = screen.getByTestId(totalFieldTestId);
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent(expectedValue);
  });
});
