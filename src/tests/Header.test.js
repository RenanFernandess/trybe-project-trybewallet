import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const emailFieldTestId = 'email-field';
const totalFieldTestId = 'total-field';
const headerCurrencyFieldTestId = 'header-currency-field';

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
});
