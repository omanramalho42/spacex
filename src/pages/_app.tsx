import { Provider } from 'react-redux';
import { store } from '../context/store';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <h1>teste</h1>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
