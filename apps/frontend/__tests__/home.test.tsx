import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders hero copy and CTA', () => {
    render(<HomePage />);
    expect(screen.getByText(/AI Commerce Operating System/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Convert discovery into revenue/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore the client panel/i })).toBeInTheDocument();
  });
});
