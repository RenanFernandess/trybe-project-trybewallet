import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const EDIT_BTN = 'edit-btn';
const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';
const buttonText = /^Editar despesa$/i;

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

describe('Testa se é possivel editar uma despesa', () => {
  it('Testa se au editar um despesa as informações na tabela são atualizadas', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...mockData,
      }),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState: wallet });

    const buttonEdit = screen.getAllByTestId(EDIT_BTN);
    expect(buttonEdit).toHaveLength(3);

    expect(screen.getByText(/^Chinelo quadrado$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^Lazer$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^40.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^190.12$/gi, { selector: 'td' })).toBeInTheDocument();

    userEvent.click(buttonEdit[0]);

    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT);
    const button = screen.getByRole('button', { name: buttonText });

    inputValue.value = '';
    userEvent.type(inputValue, '60');
    inputDescription.value = '';
    userEvent.type(inputDescription, 'Chinelo xablau');
    userEvent.click(button);

    expect(screen.getByText(/^Chinelo xablau$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^60.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText(/^285.18$/gi, { selector: 'td' })).toBeInTheDocument();

    expect(screen.queryByText(/^Chinelo quadrado$/gi, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.getByText(/^Lazer$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(screen.queryByText(/^40.00$/gi, { selector: 'td' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^190.12$/gi, { selector: 'td' })).not.toBeInTheDocument();
  });
});
