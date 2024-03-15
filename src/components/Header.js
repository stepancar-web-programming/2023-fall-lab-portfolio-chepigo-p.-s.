import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortalDrawer from "../components/PortalDrawer";
import FrameLogin from "./FrameLogin";
import "./Header.css"
import httpClient from "../HttpClient";
import useToken from './useToken'

const Header = () => {

    const navigate = useNavigate();
    const [isFrameLoginOpen, setFrameLoginOpen] = useState(false);

    const { token, removeToken, setToken, userId } = useToken();

    const logOut = async () => {
      await httpClient.post("/logout");
      removeToken()
      window.location.href = "/";
    }

    const onMainpageButtonClick = useCallback(() => {
        navigate("/main");
    }, [navigate]);

    const onTxt2imgButtonClick = useCallback(() => {
        navigate("/text-to-image");
    }, [navigate]);

    const onImg2imgButtonClick = useCallback(() => {
        navigate("/image-to-image");
    }, [navigate]);

    const onUpscaleButtonClick = useCallback(() => {
        navigate("/upscale");
    }, [navigate]);

    const onArchiveButtonClick = useCallback(() => {
        navigate("/archive");
    }, [navigate]);

    const onHelpButtonClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const openFrameLogin = useCallback(() => {
        setFrameLoginOpen(true);
    }, []);

    const closeFrameLogin = useCallback(() => {
        setFrameLoginOpen(false);
    }, []);

    return (
      <>
        <header className="header">
          <div className="nav-panel">
            <button
              className="mainpage-button"
              onClick={onMainpageButtonClick}
            >
              <b className="b">Главная</b>
            </button>
            <button className="txt2img-button" onClick={onTxt2imgButtonClick}>
              <b className="b">Text to Image</b>
            </button>
            <button className="txt2img-button" onClick={onImg2imgButtonClick}>
              <b className="b">Image to Image</b>
            </button>
            <button className="txt2img-button" onClick={onUpscaleButtonClick}>
              <b className="b">Upscale</b>
            </button>
            <button className="txt2img-button" onClick={onArchiveButtonClick}>
              <b className="b">Архив</b>
            </button>
            <button className="help-button" onClick={onHelpButtonClick}>
              <b className="b">Обзор</b>
            </button>
          </div>
          {!token && token!=="" &&token!== undefined ?
            <button className="login-button" onClick={openFrameLogin}>
              <b className="login-text">Log in</b>
            </button>
          : 
            <button className="login-button" onClick={logOut}>
              <b className="login-text">Log out</b>
            </button>}
        </header>
        {isFrameLoginOpen && (
          <PortalDrawer
            overlayColor="rgba(0, 0, 0, 0.8)"
            placement="Bottom"
            onOutsideClick={closeFrameLogin}
          >
          <FrameLogin onClose={closeFrameLogin} />
        </PortalDrawer>
        )}
      </>
    );
};

export default Header;

