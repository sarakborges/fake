// Dependencies
import App from "next/app";

// Contexts
import { AppProvider } from "Contexts/App";
import { UserProvider } from "Contexts/User";
import { ProfileProvider } from "Contexts/Profile";
import { GroupProvider } from "Contexts/Group";
import { MessagesProvider } from "Contexts/Messages";

// Component
const MyApp = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <UserProvider>
        <ProfileProvider>
          <GroupProvider>
            <MessagesProvider>
              <Component {...pageProps} />
            </MessagesProvider>
          </GroupProvider>
        </ProfileProvider>
      </UserProvider>
    </AppProvider>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  return { ...appProps };
};

export default MyApp;
