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

    export const uploadAvatar = async (payload: FormData) => {
        const response = await uploadInstance.post('/avatar', payload);
        const path = (response?.data?.path as string) || '';

        return path;
    };
}
