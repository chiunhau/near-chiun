import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { NearProvider } from '../contexts/nearContext';
import { styletron } from '../styletron';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <NearProvider>
          <Component {...pageProps} />
        </NearProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
