import {ApiTypes} from '@src/types/types.api';
import axios from 'axios';

const uploadInstance = axios.create({
    baseURL: ApiTypes.UPLOAD_HOST,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export namespace UploadUtils {
    export const uploadFile = async (payload: FormData) => {
        await uploadInstance.post('', payload);
    };
}
