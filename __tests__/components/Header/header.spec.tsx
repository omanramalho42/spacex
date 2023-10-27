import React from "react"
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from "@/components/Header"

import { useSearchParams, useRouter } from 'next/navigation';
import { Provider } from "react-redux";
import { store } from "@/context/store";

jest.mock('next/navigation');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('<Header>', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("should render Header", () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn((key) => (key === 'search' ? key['search'] : '')),
    }));
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const search = screen.getByRole('search');
    expect(search).toBeInTheDocument();

    const searchValue = 'example';
    fireEvent.change(search, { target: { value: searchValue } });
    jest.runAllTimers();

    expect(pushMock).toHaveBeenCalledWith(`?search=${searchValue}`);
  })
})