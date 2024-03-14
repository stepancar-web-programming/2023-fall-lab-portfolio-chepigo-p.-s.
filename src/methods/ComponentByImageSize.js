import ImageContainer1x1 from '../components/imageContainers/ImageContainer1x1';
import ImageContainer1_5x1 from '../components/imageContainers/ImageContainer1_5x1';
import ImageContainer16x9 from '../components/imageContainers/ImageContainer16x9';
import ImageContainer1x1_5 from '../components/imageContainers/ImageContainer1x1_5';
import ImageContainer9x16 from '../components/imageContainers/ImageContainer9x16';


function ComponentByImageSize(props) {
    // const imageContainers = {
    //     "0": ImageContainer1x1,
    //     "1": ImageContainer1_5x1,
    //     "2": ImageContainer1x1_5,
    //     "3": ImageContainer16x9,
    //     "4": ImageContainer9x16
    // };

    // const renderImageContainer = () => {
    //     const ImageContainer = imageContainers[props.size];
    //     return <ImageContainer {...props} />;
    // };

    // return props.is_ready ? renderImageContainer() : null;
    return (
        <div>
            {props.size == "0" && <ImageContainer1x1 {...props} />}
            {props.size == "1" && <ImageContainer1_5x1 {...props} />}
            {props.size == "2" && <ImageContainer1x1_5 {...props} />}
            {props.size == "3" && <ImageContainer16x9 {...props} />}
            {props.size == "4" && <ImageContainer9x16 {...props} />}
        </div>
    );
}

export default ComponentByImageSize