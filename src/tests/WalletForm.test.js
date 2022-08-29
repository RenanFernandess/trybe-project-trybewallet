import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const inputValueTestId = 'value-input';
// const inputDescriptionTestId = 'description-input';

describe('testa o componente WalletForm', () => {
  it('Verifica se possui um campo para adicionar valor da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByTestId(inputValueTestId)).toBeInTheDocument();
  });
});
