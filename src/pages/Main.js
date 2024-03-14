import Header from "../components/Header";
import useToken from '../components/useToken'
import ImageGallery from "../components/ImageGallery";
import LoginWarning from "../components/PageAccessWarning";

const Main = () => {

    const { token, removeToken, setToken, userId } = useToken();

    return (
        <div className="image-waterfall">
            <Header/>
            {!userId && userId !== "" && userId !== undefined ? 
                <LoginWarning/>
            :
                <ImageGallery user_id={userId}/>
            }
        </div>
    );
};

export default Main;
