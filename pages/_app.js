import Aos from "@/components/Aos";
import { SessionProvider } from "next-auth/react";
import "@/styles/modal.scss";
import "@/styles/backOffice.scss";
import "@/styles/frontOffice.scss";
import "@/styles/underconstruction.scss";
import "@etchteam/next-pagination/dist/index.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Aos>
        <Component {...pageProps} />
      </Aos>
    </SessionProvider>
  );
}
