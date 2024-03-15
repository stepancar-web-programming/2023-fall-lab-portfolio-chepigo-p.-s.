import { useState } from "react";

import Header from "../components/Header";
import { translate } from "../db_methods/methods";
import useToken from '../components/useToken';
import { GImage } from "../GImage";
import InputContainer from "../components/GenerationInputContainter";
import ImageMap from "../components/ImageMap";

const MenuTtoI = () => {

    const [images_t_to_i, addImage] = useState([]);
    const { token, removeToken, setToken, userId } = useToken();
    const [is_loading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [headerValues, setHeaderValues] = useState({
        positive: '',
        eng_positive: '',
        negative: '',
        eng_negative: '',
        model_id: "0",
        scheduler_id: "0",
        step_id: "0",
        size_id: "0",
        strength_id: "0",
        seed: "",
        is_upscale: "0",
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
    
    if (headerValues.seed === "" || headerValues.seed === "-1") {
        headerValues.seed = getRandomInt(127);
    }
    
    headerValues.eng_positive = await translate(headerValues.positive);
    headerValues.eng_negative = await translate(headerValues.negative);

    console.log(headerValues.count);

    for (let i = 0; i < headerValues.count; i++) {
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

        image.check_is_loading = checkLoading;
        image.generate_t2i(i);

        images_t_to_i.push(image);
        addImage(images_t_to_i);

        await new Promise(r => setTimeout(() => r(), 500));
    }
    setIsLoading(true);
};


const checkLoading = (receivedImage) => {
    images.push(receivedImage);
    setImages(images);  
    let is_ready = true;
    for (let image of images_t_to_i) {
        if (!image.is_ready) {
            is_ready = false;
        }
    }
    setIsLoading(!is_ready); 
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
            hasUploadButton={false}
            changeHandler={changeHandler}
            headerValues={headerValues}
            generate={generate}
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

export default MenuTtoI;
