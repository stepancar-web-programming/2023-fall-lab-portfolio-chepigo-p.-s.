import axios from "axios";
import { Buffer } from 'buffer';

export const postTask = async (props) => {
    try {
        const resp = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERV_URL}/task`,
            headers: {
                'user-id': props.user_id.toString(),
                'type': props.type_id.toString(),
                'positive': props.eng_positive.toString(),
                'model-id': props.model_id.toString(),
                'negative': props.eng_negative.toString(),
                'scheduler-id': props.scheduler_id.toString(),
                'step-id': props.step_id.toString(),
                'size-id': props.size_id.toString(),
                'strength-id': props.strength_id.toString(),
                'seed': (parseInt(props.seed) + props.index).toString(),
                'is-upscale': props.is_upscale,
                "generated": props.generated
            }
        });
        if (resp.status == 200) {
            console.log(resp);
            return resp;
        } else {
            console.log(resp);
        }
    } catch (err) {
        console.log(err);
    }
};


export const getImagesByTime = async (time_pos, user_id) => {
    const params = {
        "time": time_pos.toString()
    };
    
    if (user_id && user_id !== -1) {
        params["user"] = user_id.toString();
    }

    try {
        const res = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERV_URL}/wfiles`,
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            params,
            responseType: "arraybuffer"
        });
        
        if (res.status == 404) {
            return null;
        }
        
        let base64ImageString = Buffer.from(res.data, 'binary').toString('base64');
        let srcValue =  "data:image/png;base64,"+ base64ImageString;
        return srcValue;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const translate = async (value) => {
    try {
        const resp = await axios({
            method: 'POST',
            maxBodyLength: Infinity,
            url: '/translate',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: {
                "value": value
            }
        });
        if (resp.status == 200) {
            return resp.data.translated;
        } else {
            console.log(resp);
        }
    } catch (err) {
        console.log(err);
    }
};