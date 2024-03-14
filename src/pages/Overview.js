import { useState, useCallback, useEffect } from "react";
import "./Overview.css";
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";

const Overview = () => {

    useEffect(() => {
        const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");

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

  return (
    <>
      <div className="help">
        <Header/>
        <div className="help-body" data-animate-on-scroll>
          <div className="quick-start">
            <div className="quick-start-text-frame">
              <b className="quick-start-text-frame1">Дисклеймер</b>
            </div>
            <div className="quick-start-text-readme">
              <b className="quick-start-text-frame1">
                {`Данный ресурс задумывался, как свалка проектов приуроченных к хакатонам или безделию команды Null-Safe Senior Arbusing Engineers. На данный момент на сайте запущен только проект по генерации изображений с помощью нейронных сетей. Тестовые креды: User1:P@ss1`}
              </b>
            </div>
          </div>

          <div className="quick-start">
            <div className="quick-start-text-frame">
              <b className="quick-start-text-frame1">Трейлер</b>
            </div>
            <VideoPlayer 
              src_link="/rick.mp4"
            />
          </div>

          
          <div className="quick-start">
            <div className="quick-start-text-frame">
              <b className="quick-start-text-frame1">Контакты</b>
            </div>
            <div className="technical-support-text-readme">
              <b className="quick-start-text-frame1">
                {`ТГ бот: @StableSaviorBot`}
                <p>{`Почта: help@imworse.space`}</p>
              </b>  
            </div>
          </div>

          <div className="quick-start">
            <div className="quick-start-text-frame">
              <b className="quick-start-text-frame1">Участники</b>
            </div>
            <div className="technical-support-text-readme">
            <b className="quick-start-text-frame1">
                <p>
                  {`Текущий состав:
                    @Tommywh
                    @Tomatae
                    @Ferrocia
                    @Surepich
                    @ProffPlut`}
                </p>
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
