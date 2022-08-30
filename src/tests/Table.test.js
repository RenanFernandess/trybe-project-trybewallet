import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import mockData from './helpers/mockData';

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
    ],
  },
};

describe('Testa o componente Table', () => {
  it('Verifica se possuir um cabeçalho com os seguintes valores: Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão, Editar/Excluir', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByText(/^Descrição$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Tag$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Método de pagamento$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Valor$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Moeda$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Câmbio utilizado$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Valor convertido$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Moeda de conversão$/gi, { selector: 'th' })).toBeInTheDocument();
    expect(screen.getByText(/^Editar\/Excluir$/gi, { selector: 'th' })).toBeInTheDocument();
  });
  it('Testa se os gastos são renderizado na tabela', () => {
    renderWithRouterAndRedux(<Table />, { initialState: wallet });

    expect(screen.getByText(/^Chinelo quadrado$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Lazer$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^40.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^190.12$/gi, { selector: 'td' })).toBeInTheDocument();

    expect(screen.getByText(/^Academia$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Saúde$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^90.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^427.77$/gi, { selector: 'td' })).toBeInTheDocument();

    expect(screen.getAllByText(/^Dólar Americano\/Real Brasileiro$/gi, { selector: 'td' })).toHaveLength(2);
    expect(screen.getAllByText(/^4.75$/gi, { selector: 'td' })).toHaveLength(2);
    expect(screen.getAllByText(/^Real$/gi, { selector: 'td' })).toHaveLength(2);
    expect(screen.getAllByText(/^Dinheiro$/gi, { selector: 'td' })).toHaveLength(2);
  });
  it('Testa se o resultado der um numero sem casas decimais, o valor total é mostrado no formato correto com apenas duas casas decimais apos o ponto "0.00"', () => {
    const walletmock = {
      wallet: {
        expenses: [
          {
            id: 0,
            value: '40',
            description: 'Chinelo quadrado',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Lazer',
            exchangeRates: {
              USD: {
                ask: 4,
              },
            },
          },
        ],
      },
    };

    renderWithRouterAndRedux(<Table />, { initialState: walletmock });

    expect(screen.getByText(/^160.00$/gi, { selector: 'td' })).toBeInTheDocument();
  });
});
