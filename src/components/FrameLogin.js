import { useCallback, useEffect} from "react";
import FormLogin from "./FormLogin";
import "./FrameLogin.css";
const FrameLogin = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onBIDontHaveClick = useCallback(() => {
    window.location.href = "mailto:aplatov2023@gmail.com";
    onClose && onClose();
  }, []);

  return (
    <div className="frame-login" data-animate-on-scroll>
      <div className="main-frame-login">
        <div className="main-frame-login-child" />
        <FormLogin />
        <div className="main-frame-login-child" />
      </div>
      <a
        className="b-i-dont-have"
        href="mailto:aplatov2023@gmail.com"
        onClick={onClose}
      >
        <button className="button">Нет учётных данных?</button>
      </a>
    </div>
  );
};

export default FrameLogin;
