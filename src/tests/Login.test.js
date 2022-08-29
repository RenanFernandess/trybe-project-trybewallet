import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const inputEmailTestId = 'email-input';
const inputPasswordTestId = 'password-input';
const buttonText = 'Entrar';

describe('Testes da Pagina Login', () => {
  it('Verifica se a pagina começa na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
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
  it('Verifica se possui um botão com o texto "Entrar", espera que esse botão inicie desativado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Verifica se o botão é ativado apos digitar o e-mail no formato correto e uma senha com no minimo 6 digitos', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByTestId(inputPasswordTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);

    userEvent.type(inputPassword, '123456');
    userEvent.type(inputEmail, 'xablau@gmail.com');

    const button = screen.getByRole('button', { name: buttonText });

    expect(button).not.toBeDisabled();
  });
  it('Verifica se au clicar o botão muda para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByTestId(inputPasswordTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);

    userEvent.type(inputPassword, '123456');
    userEvent.type(inputEmail, 'xablau@gmail.com');

    const button = screen.getByRole('button', { name: buttonText });

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
