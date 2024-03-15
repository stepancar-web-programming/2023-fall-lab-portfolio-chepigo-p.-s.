import { useState } from "react";

import "./Upscale.css";
import Header from "../components/Header";
import useToken from '../components/useToken';
import { GImage } from "../GImage";
import ImageMap from "../components/ImageMap";

const MenuUps = () => {

    const { token, removeToken, setToken, userId } = useToken();
    const [selectedImage, setSelectedImage] = useState(null);
    const [nameOfDownloaded, setNameOfDownloaded] = useState(null);
    const [images, setImages] = useState([]);
    const [is_loading, setIsLoading] = useState(false)
    const [headerValues, setHeaderValues] = useState({
        positive: '4k ultra HD',
        eng_positive: '',
        model_id: "0",
        negative: '',
        eng_negative: '',
        scheduler_id: "0",
        step_id: '0',
        size_id: "0",
        strength_id: "0",
        seed: '',
        count: 1,
        image_src: ""
    });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const generate = async e => {
    e.preventDefault();
    if (!userId && userId !== "" && userId !== undefined) {
      alert("You must first log in");
      return;
    } 
      
    if (selectedImage == null) {
        alert("You must upload an image");
        return;
    }
      
    if (headerValues.seed === "" || headerValues.seed === "-1") {
        headerValues.seed = getRandomInt(127);
    }

    const image = new GImage({
        user_id: userId,
        positive: headerValues.eng_positive,
        negative: headerValues.eng_negative,
        model_id: headerValues.model_id,
        scheduler_id: headerValues.scheduler_id,
        step_id: headerValues.step_id,
        size_id: headerValues.size_id,
        strength_id: headerValues.strength_id,
        seed: headerValues.seed,
        is_upscale: headerValues.is_upscale,
        generated: headerValues.generated
    });

    image.base_image = selectedImage;
    image.check_is_loading = checkLoading;
    image.generate_ups(i);

    images_t_to_i.push(image);
    addImage(images_t_to_i);

    await new Promise(r => setTimeout(() => r(), 500));
}

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setSelectedImage(file);
  setNameOfDownloaded(file.name);
};

const changeHandler = e => {
  const { name, value } = e.target;

  setHeaderValues((prevState) => ({...prevState, [name]: value}));
}

  return (
    <>
    <main className="generation-menu">
      <Header/>
      <div className="content-body" data-animate-on-scroll>
        <div className="rows-body">
          <div className="img2img-bbuttons">
            <button className="upload-button" autoFocus>
              <input 
                className="upload-input"  
                type="file" 
                onChange={handleImageChange}
              />
              <div className="upload-text">
                {nameOfDownloaded == null ? 
                  <p>Загрузить</p>
                  :
                  <p>{nameOfDownloaded}</p>
                }
              </div>
            </button>
            <button disabled={is_loading} className="upload-button" onClick={generate} autoFocus>
              <div>Генерировать</div>
            </button>
          </div>
        </div>
          <ImageMap
            is_loading={is_loading}
            images={images}
            userId={userId}
          />
      </div>
    </main>
  </>
  );
};

export default MenuUps;
