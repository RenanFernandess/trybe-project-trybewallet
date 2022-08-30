import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const inputValueTestId = 'value-input';
const inputDescriptionTestId = 'description-input';
const inputCurrencyTestId = 'currency-input';
const inputMethodTestId = 'method-input';
const inputTagTestId = 'tag-input';
const buttonText = /^Adicionar despesa$/i;
const totalFieldTestId = 'total-field';

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
  it('testa se a pessoa usuária adicionar um gasto, o valor total no header é atualizado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...mockData,
      }),
    });

    renderWithRouterAndRedux(<Wallet />);

    const field = screen.getByTestId(totalFieldTestId);
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent('0');

    const inputValue = screen.getByTestId(inputValueTestId);
    const inputDescription = screen.getByTestId(inputDescriptionTestId);
    const button = screen.getByRole('button', { name: buttonText });

    userEvent.type(inputValue, '40');
    userEvent.type(inputDescription, 'test');
    userEvent.click(button);

    expect(await screen.findByTestId(totalFieldTestId)).toHaveTextContent(/^190.12$/i);
  });
  it('Testa se a pessoa usuária adicionar um gasto, as informações são adicionadas na tabela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        ...mockData,
      }),
    });

    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(inputValueTestId);
    const inputDescription = screen.getByTestId(inputDescriptionTestId);
    const button = screen.getByRole('button', { name: buttonText });

    userEvent.type(inputValue, '40');
    userEvent.type(inputDescription, 'test');
    userEvent.click(button);

    expect(await screen.findByText(/^test$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Alimentação$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^40.00$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^190.12$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Dólar Americano\/Real Brasileiro$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^4.75$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Real$/gi, { selector: 'td' })).toBeInTheDocument();
    expect(await screen.findByText(/^Dinheiro$/gi, { selector: 'td' })).toBeInTheDocument();
  });
});
