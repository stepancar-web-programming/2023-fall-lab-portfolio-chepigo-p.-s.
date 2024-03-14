import axios from "axios";
import { Buffer } from "buffer";

export class GImage {
    constructor({
        user_id, positive, negative, model_id, scheduler_id, step_id, size_id, strength_id, seed, is_upscale, generated
    }) {

        this.user_id = user_id;
        this.positive = positive;
        this.negative = negative;
        this.model_id = model_id;
        this.scheduler_id = scheduler_id;
        this.step_id = step_id;
        this.size_id = size_id;
        this.strength_id = strength_id;
        this.seed = seed;
        this.is_upscale = is_upscale;
        this.generated = generated;
        this.imageData = null;

        this.base_image;
        this.task_id;
        this.index;
        this.is_ready = false;
        this.src_value;
        this.interval_id;

        this.check_is_loading;
    }

    pack_params(type_id) {
        return {
            'user-id': this.user_id.toString(),
            'type': type_id,
            'positive': this.positive.toString(),
            'model-id': this.model_id.toString(),
            'negative': this.negative.toString(),
            'scheduler-id': this.scheduler_id.toString(),
            'step-id': this.step_id.toString(),
            'size-id': this.size_id.toString(),
            'strength-id': this.strength_id.toString(),
            'seed': (parseInt(this.seed) + this.index).toString(),
            'is-upscale': "false",
            "generated": "2"
        }
    }

    check_image_status() {
        try {
            // Проверяем состояние задачи в цикле по интервалу времени
            let status = 0;
            let imageData;
            this.interval_id = setInterval(async () => {
                const resp = await axios.get(`${process.env.REACT_APP_SERV_URL}/status`, {
                    headers: {
                        "task-id": this.task_id
                    }
                }).catch(function (error) {
                    if (error.response) {
                        alert(error.response.data.error);
                    }
                });
    
                imageData = resp.data.file_id;
                status = resp.data.status;
                
                if (status === "2") {
                    if (imageData === "None") {
                        alert("Возникла ошибка при генерации, попробуйте ещё раз");
                        this.set_loading(false);
                        return;
                    }
                    if (!this.is_ready) {
                        this.load(imageData, this.index);
                    }
                    clearInterval(this.interval_id);
                    return;
                }
            }, 5000);
        } catch (error) {
            console.log('Ошибка при выполнении запроса:', error);
        }
    };
  
    async generate_t2i(index) { 
        this.index = index;  
        // console.log((parseInt(this.seed) + this.index).toString());
        try {   
            const resp = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_SERV_URL}/task`,
                headers: this.pack_params("0")
            });
            if (resp.status == 200) {
                console.log(resp);
                this.task_id = resp.data["task-id"];
                this.check_image_status();
            } else {
                console.log(resp);
            }
        } catch (err) {
            console.log(err);
        }
    };

    async generate_i2i(index) {
        this.index = index;
        // console.log((parseInt(this.seed) + this.index).toString());
        try {
            const resp = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_SERV_URL}/task`,
                headers: this.pack_params("1"),
                files: {
                    "image": this.base_image
                }
            });
            if (resp.status == 200) {
                console.log(resp);
                this.task_id = resp.data["task-id"];
                this.check_image_status();
            } else {
                console.log(resp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async generate_ups(index) {
        this.index = index;
        // console.log((parseInt(this.seed) + this.index).toString());
        try {
            const resp = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_SERV_URL}/task`,
                headers: this.pack_params("2"),
                files: {
                    "image": this.base_image
                }
            });
            if (resp.status == 200) {
                console.log(resp);
                this.task_id = resp.data["task-id"];
                this.check_image_status();
            } else {
                console.log(resp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    load(imageData, index) {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERV_URL}/files/${imageData}`,
            responseType: "arraybuffer"
        }).then(res => {
            let base64ImageString = Buffer.from(res.data, 'binary').toString('base64');
            this.src_value = "data:image/png;base64,"+ base64ImageString;

            this.is_ready = true;
            this.check_is_loading(this.pack_received_image());
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
    }

    pack_received_image() {
        return {
            positive: this.positive,
            negative: this.negative,
            model_id: this.model_id,
            scheduler_id: this.scheduler_id,
            step_id: this.step_id,
            size_id: this.size_id,
            strength_id: this.strength_id,
            seed: (parseInt(this.seed) + this.index).toString(),
            is_upscale: this.is_upscale,
            generated: this.generated,
            imageData: this.imageData,
            image_src: this.src_value
        };
    }
}
  
  