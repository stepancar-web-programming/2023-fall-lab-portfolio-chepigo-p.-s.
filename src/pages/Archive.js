import ImageGallery from "../components/ImageGallery";
import Header from "../components/Header";

const Archive = () => {

    return (
        <div className="image-waterfall">
            <Header/>
            <ImageGallery user_id={-1}/>
        </div>
    );
};

export default Archive;
