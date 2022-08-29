import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const inputEmailTestId = 'email-input';
const inputPasswordTestId = 'password-input';

describe('Testes da Pagina Login', () => {
  it('Verifica se possui um local para a pessoa usuária digitar o Email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    expect(inputEmail).toBeInTheDocument();
  });
  it('Verifica se possui um local para a pessoa usuária digitar a senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByTestId(inputPasswordTestId);
    expect(inputPassword).toBeInTheDocument();
  });
});
