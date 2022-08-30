import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';

const totalFieldTestId = 'total-field';
const deleteButtonTestId = 'delete-btn';

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

describe('Testa se é possivel remover uma despesa', () => {
  it('Verifica se possui um Botão para remover a despesa', () => {
    renderWithRouterAndRedux(<Table />, { initialState: wallet });
    expect(screen.getAllByTestId(deleteButtonTestId)).toHaveLength(3);
  });
});
