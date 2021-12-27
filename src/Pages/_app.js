// Dependencies
import App from "next/app";

// Contexts
import { AppProvider } from "Contexts/App";
import { UserProvider } from "Contexts/User";

// Component
const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <UserProvider>
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
