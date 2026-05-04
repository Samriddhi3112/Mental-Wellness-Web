import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "./i18n";

const App = () => {
  useEffect(() => {
    const langMap = {
      english: "en",
      hindi: "hi",
      bengali: "bn",
      odiya: "or",
      assamese: "as",
      malayalam: "ml",
      tamil: "ta",
    };

    const savedLang = localStorage.getItem("lang") || "en";
    const finalLang = langMap[savedLang] || savedLang;

    i18n.changeLanguage(finalLang);
  }, []);
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
