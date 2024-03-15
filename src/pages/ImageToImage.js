import { useState } from "react";

import Header from "../components/Header"
import axios from "axios";
import useToken from '../components/useToken';
import { GImage } from "../GImage";
import InputContainer from "../components/GenerationInputContainter";
import ImageMap from "../components/ImageMap";

const MenuItoI = () => {

    const { token, removeToken, setToken, userId } = useToken();
    const [selectedImage, setSelectedImage] = useState(null);
    const [nameOfDownloaded, setNameOfDownloaded] = useState(null);
    const [images, setImages] = useState([]);
    const [is_loading, setIsLoading] = useState(false)
    const [headerValues, setHeaderValues] = useState({
        positive: '',
        eng_positive: '',
        model_id: "0",
        negative: '',
        eng_negative: '',
        scheduler_id: "0",
        step_id: "0",
        size_id: "0",
        strength_id: "0",
        seed: "",
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

    if (!headerValues.positive) {
        alert("You must enter positive prompt first");
        return;
    }
    
    if (selectedImage == null) {
        alert("You must upload an image");
        return;
    }
    
    if (headerValues.seed === "" || headerValues.seed === "-1") {
        headerValues.seed = getRandomInt(127);
    }

    headerValues.eng_positive = await translate(headerValues.positive);
    headerValues.eng_negative = await translate(headerValues.negative);
    
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
    image.generate_i2i(i);

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
      <div className="generation-menu">
        <Header/>
        <main className="content-body">
          <InputContainer
            hasUploadButton={true}
            changeHandler={changeHandler}
            headerValues={headerValues}
            generate={generate}
            handleImageChange={handleImageChange}
            nameOfDownloaded={nameOfDownloaded}
          />
          <ImageMap
            is_loading={is_loading}
            images={images}
            userId={userId}
          />
        </main>
      </div>
    </>
  );
};

export default MenuItoI;
