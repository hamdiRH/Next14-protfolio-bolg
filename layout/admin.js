import Aside from "@/components/Aside";
import Header from "@/components/Header";
import "react-markdown-editor-lite/lib/index.css";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <Aside />
      {children}
    </>
  );
}
