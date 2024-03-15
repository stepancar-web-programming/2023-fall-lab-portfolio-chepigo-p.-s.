import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Archive from "./pages/Archive";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import Main from "./pages/Main";
import MenuItoI from "./pages/ImageToImage";
import MenuTtoI from "./pages/TextToImage";
import MenuUps from "./pages/Upscale";
import { useEffect } from "react";

function App() {
    const action = useNavigationType();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action, pathname]);

    useEffect(() => {
        let title = "savior-web";
        let metaDescription = "";

        switch (pathname) {
            case "/main":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/archive":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/header":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/main":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/image-to-image":
                title = "savior-web";
                metaDescription = "";
                break;
            case "/text-to-image":
                title = "savior-web";
                metaDescription = "";
                break;
            default:
                title = "savior-web";
                metaDescription = "";
                break;
        }

        if (title) {
            document.title = title;
        }

        if (metaDescription) {
            const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
            if (metaDescriptionTag) {
                metaDescriptionTag.content = metaDescription;
            }
        }
    }, [pathname]);

    return (
        <Routes>
          <Route path="/archive" element={<Archive />} />
          <Route path="/main" element={<Main />} />
          <Route path="/header" element={<Header />} />
          <Route path="/" element={<Overview />} />
          <Route path="/upscale" element={<MenuUps />} />
          <Route path="/image-to-image" element={<MenuItoI />} />
          <Route path="/text-to-image" element={<MenuTtoI />} />
        </Routes>
    );
}
export default App;
