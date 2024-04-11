import "@/styles/globals.css";
import AuthProvider from "@/provider/AuthProvider";
import { SnackbarProvider } from "notistack";

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <SnackbarProvider />
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
