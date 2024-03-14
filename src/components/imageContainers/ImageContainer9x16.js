import "./GeneratedImage.css"
import { getModelById, getSchedulerById, getSizeById, getStepsById, getStrengthById } from "../../methods/TranslateMethods";
import { imgContainerPostTask } from "./ImageContainerCommon";

function ImageContainer9x16 ( props )  {

  const imageUrl = props.image;

  const handleDownloadClick = (event) => {
    event.preventDefault();
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'image.jpg';
      link.click();
    }
  };

  return (
    <div className="frame-mini-gallery">
    <div className="mini-gallery-frame">
      <div className="mini-gallery-row-06">
        <img
          className="icon-9x16 image-preview"
          alt=""
          src={imageUrl}
        />
        <div className="save-button">
          <button className="save-button-button" onClick={handleDownloadClick}>
            <div className="save-button-label">save</div>
          </button>
          <button className="save-button-button" onClick={imgContainerPostTask}>
            <div className="save-button-label">upscale</div>
          </button>
        </div>
      </div>
      <div className="mini-gallery-row-16">
        <div className="param-container-positive">
          <div className="param-name">positive</div>
        </div>
        <div className="param-value-prompt">
          {`${props.positive}`}
        </div>
        <div className="param-container-negative">
          <div className="param-name">negative</div>
        </div>
        <div className="param-value-prompt">
        {`${props.negative}`}
        </div>
      </div>
      <div className="detailed-params-block">
        <div className="param-container">
          <div className="param-name">Модель</div>
          <div className="param-value">
            {getModelById(props.model)}
          </div>
        </div>
        <div className="param-container">
          <div className="param-name">Разрешение</div>
          <div className="param-value">
            {getSizeById(props.size)}
          </div>
        </div>
        <div className="param-container">
          <div className="param-name">Seed</div>
          <div className="param-value">
            {`${props.seed}`}
          </div>
        </div>
      </div>
      <div className="mini-gallery-row-2-06">
        <div className="param-container">
          <div className="param-name">Сила</div>
          <div className="param-value">
            {getStrengthById(props.strength)}
          </div>
        </div>
        <div className="param-container">
          <div className="param-name">Смешиватель</div>
          <div className="param-value">
            {getSchedulerById(props.scheduler)}
          </div>
        </div>
        <div className="param-container">
          <div className="param-name">Шаги</div>
          <div className="param-value">
            {getStepsById(props.steps)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ImageContainer9x16;