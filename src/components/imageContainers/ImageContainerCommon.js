import axios from "axios";
import {Buffer} from 'buffer';

const base64ToImage = (base64) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = base64;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };

const imgContainerPostTask = async () => {
    const image = base64ToImage(props.image);
    await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERV_URL}/task`,
        headers: {
            'user-id': props.userId.toString(),
            'type': "2",
            'positive': props.eng_positive.toString(),
            'model-id': props.model.toString(),
            'negative': props.eng_negative.toString(),
            'scheduler-id': props.scheduler.toString(),
            'step-id': props.steps.toString(),
            'size-id': props.size.toString(),
            'strength-id': props.strength.toString(),
            'seed': props.seed.toString(),
            'is-upscale': "true",
            "generated": "2"
        },
        files: {
            "image": image
        }
    }).then(resp => {
        alert("Upscale задание добавлено")
        console.log(resp);
        if (resp.status == 200) {
            checkImageStatus(resp.data["task-id"]);
        }
    }).catch(err => {
        alert("Ошибка при отправлении upscale задания")
    });
}

const getAndSetResult = (imageData) => {
    axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERV_URL}/wfiles/${imageData}`,
        responseType: "arraybuffer"
    }).then(res => {
        let base64ImageString = Buffer.from(res.data, 'binary').toString('base64');
        let srcValue =  "data:image/png;base64,"+ base64ImageString;
        const link = document.createElement('a');
        link.href = srcValue;
        link.download = 'image-upscale.jpg';
        link.click();
    }).catch(function (error) {
        if (error.responce) {
            console.log(error.response.status);
        } else if (error.request) {
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    })
}

const checkImageStatus = (taskId) => {
    try {
        // Проверяем состояние задачи в цикле по интервалу времени
        let status = 0;
        let imageData;
        const intervalId = setInterval(async () => {
            if (status === "2") {
                getAndSetResult(imageData);
                clearInterval(intervalId);
                return ;
            }
            const resp = await axios.get(`${process.env.REACT_APP_SERV_URL}/status`, {
                headers: {
                    "task-id": taskId
                }
            }).catch(function (error) {
                if (error.response) {
                    alert(error.response.data.error);
                }
            });

            imageData = resp.data.file_id;
            status = resp.data.status;

            console.log(resp);
            console.log(resp.data.status === "2");
            
            if (status === "2") {
                getAndSetResult(imageData);
                clearInterval(intervalId);
                return ;
            }
        }, 5000); // Интервал проверки состояния задачи (5 секунд)
    } catch (error) {
        console.log('Ошибка при выполнении запроса:', error);
    }
};


export { imgContainerPostTask };