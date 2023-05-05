import "@/styles/globals.css";
import ContextWrapper from "../context/ContextWrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <DndProvider backend={HTML5Backend}>
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </DndProvider>
    </ContextWrapper>
  );
}
