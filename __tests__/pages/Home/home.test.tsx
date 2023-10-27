import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import Home from '@/app/(home)/page';
import { Provider } from 'react-redux';
import { store } from '@/context/store';



jest.mock('next/navigation');
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const sum = (a: number,b: number) => {
  return a + b
}

describe('<Home>', () => {
  it('should sum correctly', () => {
    expect(sum(4, 4)).toBe(8);
  });

  it('should render list of launchers', async () => {
    // const server = setupServer(
    //   http.get('http://localhost:3333/api/v1/launchers', (req, res, ctx) => {
    //     return res(
    //       ctx.json([
    //         { id: 1, name: 'Apollo 11' },
    //         { id: 2, name: 'Apollo 12' },
    //       ])
    //     );
    //   })
    // );
    // const server = setupServer(
    //   http.get('http://localhost:3333/api/v1/launchers', () => {
    //     return HttpResponse.json({
    //       id: '15d42a4d-1948-4de4-ba78-b8a893feaf45',
    //       flight_number: '1',
    //     })
    //   })
    // )
    // beforeAll(() => server.listen());
    // afterEach(() => server.resetHandlers());
    // afterAll(() => server.close());

    // render(
    //   <Provider store={store}>
    //     <Home 
    //       searchParams={{ search: 'string' }} 
    //     />
    //   </Provider>
    // );
    // await waitFor(() => {
    //   expect(screen.getByText('Apollo 11')).toBeInTheDocument();
    //   expect(screen.getByText('Apollo 12')).toBeInTheDocument();
    // });
  });
});
