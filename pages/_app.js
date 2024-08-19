import Aos from "@/components/Aos";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux/store";

import "@/styles/global.scss";
import "@/styles/modal.scss";
import "@/styles/backOffice.scss";
import "@/styles/frontOffice.scss";
import "@/styles/underconstruction.scss";
import "rc-pagination/assets/index.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Aos>
          <Component {...pageProps} />
        </Aos>
      </SessionProvider>
    </Provider>
  );
}
