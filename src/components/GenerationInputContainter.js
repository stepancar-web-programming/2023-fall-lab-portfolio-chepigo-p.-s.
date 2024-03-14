import "./GenerationInputContainer.css"
import { Textarea } from "@chakra-ui/react";
import FormContainer from "./FormContainer";

const InputContainer = (params) => {

    return (
        <div className="rows-body">
            <form className="row-1">
                {params.hasUploadButton ?
                <button className="upload-button" autoFocus>
                    <input 
                        className="upload-body"  
                        type="file" 
                        onChange={params.handleImageChange}
                    />
                    <div className="upload-text">
                    {params.nameOfDownloaded == null ? 
                        <p>Загрузить</p>
                        :
                        <p>{params.nameOfDownloaded}</p>
                    }
                    </div>
                </button>
                : <></> }
                <Textarea
                    className="positive-field"
                    variant="filled"
                    name="positive"
                    id="0001"
                    size="lg"
                    placeholder="positive"
                    backgroundColor="rgba(255, 255, 255, 0.2)"
                    borderColor="#2d8730"
                    focusBorderColor="#2d8730"
                    onChange={params.changeHandler}
                    value={params.headerValues.positive}
                    isRequired
                />
                <Textarea
                    className="negative-field"
                    variant="filled"
                    name="negative"
                    id="0002"
                    size="lg"
                    placeholder="negative"
                    backgroundColor="rgba(255, 255, 255, 0.2)"
                    borderColor="#872d2d"
                    focusBorderColor="#872d2d"
                    onChange={params.changeHandler}
                    value={params.headerValues.negative}
                />
                <button 
                    type="submit" 
                    onClick={params.generate} 
                    disabled={params.is_loading} 
                    className="generate-button" 
                    autoFocus
                >
                    <div>Генерировать</div>
                </button>
            </form>
            <FormContainer
                handleChange={params.changeHandler}
                post={params.headerValues}
            />
          </div>
    );
};

export default InputContainer;