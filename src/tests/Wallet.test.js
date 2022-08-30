import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const inputValueTestId = 'value-input';
const inputDescriptionTestId = 'description-input';
const inputCurrencyTestId = 'currency-input';
const inputMethodTestId = 'method-input';
const inputTagTestId = 'tag-input';
const buttonText = /^Adicionar despesa$/ig;

describe('Testa a pagina Wallet', () => {
  it('Verifica se possui um formulario onde a pessoa usuária pode digitar as informações sobre os seus gastos', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...mockData,
      }),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(inputValueTestId);
    const inputDescription = screen.getByTestId(inputDescriptionTestId);
    const inputCurrency = screen.getByTestId(inputCurrencyTestId);
    const inputMethod = screen.getByTestId(inputMethodTestId);
    const inputTag = screen.getByTestId(inputTagTestId);
    const button = screen.getByRole('button', { name: buttonText });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
