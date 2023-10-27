import React from "react"
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import PaginationControl from "@/components/PaginationControl"

import { useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('<PaginationControl>', () => {
  it("should render pagination", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn((key) => (key === 'page' ? '1' : '5')),
    }));
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
    render(
      <PaginationControl
        hasNextPage
        hasPrevPage
      />
    );
    const prevButton = screen.getByRole('button', { name: /prev page/i });
    const nextButton = screen.getByRole('button', { name: /next page/i });

    const select = screen.getByRole('contentinfo');

    expect(select).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);
    
    expect(pushMock).toHaveBeenCalledWith('/?page=0&per_page=5');
    expect(pushMock).toHaveBeenCalledWith('/?page=2&per_page=5');
  })
})