import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const totalFieldTestId = 'total-field';
const deleteButtonTestId = 'delete-btn';

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

describe('Testa se é possivel remover uma despesa', () => {
  it('Verifica se possui um Botão para remover a despesa', () => {
    renderWithRouterAndRedux(<Table />, { initialState: wallet });
    expect(screen.getAllByTestId(deleteButtonTestId)).toHaveLength(3);
  });
  it('Verifica se clicar no botão de deletar, a despesa é apagada da tabela', () => {
    renderWithRouterAndRedux(<Table />, { initialState: wallet });

    expect(screen.getByText(/^Chinelo quadrado$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Lazer$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^40.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^190.12$/gi, { selector: 'td' })).toBeInTheDocument();

    expect(screen.getByText(/^Academia$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Saúde$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^90.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^427.77$/gi, { selector: 'td' })).toBeInTheDocument();

    const [firstButton] = screen.getAllByTestId(deleteButtonTestId);
    userEvent.click(firstButton);

    expect(screen.queryByText(/^Chinelo quadrado$/gi, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^Lazer$/gi, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^40.00$/gi, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^190.12$/gi, { selector: 'td' })).not.toBeInTheDocument();

    expect(screen.getByText(/^Academia$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Saúde$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^90.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^427.77$/gi, { selector: 'td' })).toBeInTheDocument();
  });
  it('Verifica se clicar no botão de deletar, o valor total é calculado de novo', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: wallet });
    expect(screen.getByTestId(totalFieldTestId)).toHaveTextContent(/^784.26$/g);

    const [firstButton] = screen.getAllByTestId(deleteButtonTestId);
    userEvent.click(firstButton);

    expect(screen.getByTestId(totalFieldTestId)).toHaveTextContent(/^594.13$/g);
  });
});
