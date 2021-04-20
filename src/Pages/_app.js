// Dependencies
import App from "next/app";

// Contexts
import { AppProvider } from "Contexts/App";
import { UserProvider } from "Contexts/User";

// Styles
import { GlobalStyle } from "Styles/global";

// Component
const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <UserProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </UserProvider>
    </AppProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  return { ...appProps };
};

export default MyApp;
