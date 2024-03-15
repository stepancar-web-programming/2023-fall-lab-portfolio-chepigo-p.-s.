import { Loader } from './Loader';
import ComponentByImageSize from "../methods/ComponentByImageSize";

const ImageMap = ({ is_loading, images, userId }) => {

    console.log(images);

    return (
        <div>
            {is_loading ? <Loader className = "loader"/> : <></>}
            {images.map((values, index) => (
                <ComponentByImageSize 
                    key={index} 
                    positive = {values.positive} 
                    negative = {values.negative} 
                    eng_negative = {values.eng_negative}
                    eng_positive = {values.eng_positive}
                    model={values.model_id}
                    size = {values.size_id}
                    seed = {values.seed}
                    strength = {values.strength_id}
                    scheduler = {values.scheduler_id}
                    steps = {values.step_id}
                    userId= {userId}
                    image = {values.image_src}
                />
            ))}
        </div>
    )
};

export default ImageMap;