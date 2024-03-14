import React, {useState, useEffect} from "react";
import { saveAs } from 'file-saver'
import InfiniteScroll from "react-infinite-scroll-component";
import "./ImageGallery.css";
import { Loader } from "./Loader";
import { EndMessage } from "./EndMessage";
import { getImagesByTime } from "../db_methods/methods";

const Image = ({ src, alt }) => (
    <img className="image-obj" src={src} alt={alt}/>
);

const ImageGallery = (params) => {

    const downloadImage = (src, alt) => {
        saveAs(src, alt) // Put your image URL here.
    }
    
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const getImages = async (size, count) => {
        for (let i = 1; i <= count; i++) {
            if (!hasMore) {
                break;
            }
            let src_value = await getImagesByTime(size + i, params.user_id);
            if (!src_value) {
                setHasMore(false);
                return;
            }
            setImages(prevImages => {
                return [...prevImages, src_value]
            })
        }
    };

    useEffect(() => {
        getImages(0, 20);
    }, []);

    return (
        <InfiniteScroll
            dataLength={images}
            next={() => getImages(images.length, 1)}
            hasMore={hasMore}
            loader={<Loader className = "loader"/>}
            endMessage= {
                <EndMessage/>
            }
        >
            <div className="image-gallery">
                {
                    images.map((image, index) => (
                        <Image key={index} src={image} alt={`image_№${index}`}/>
                    ))
                }
            </div>
        </InfiniteScroll>
    );
};

export default ImageGallery;