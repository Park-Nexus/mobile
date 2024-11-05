import {ApiTypes} from '@src/types/types.api';
import axios from 'axios';
import {useState} from 'react';

const uploadInstance = axios.create({
    baseURL: ApiTypes.UPLOAD_HOST,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export function useUpload() {
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = async (payload: FormData) => {
        await uploadInstance.post('', payload);
    };

    type TUploadAvatarPayload = {
        file: {
            uri: string;
            type: string;
            name: string;
        };
    };
    const uploadAvatar = async ({file}: TUploadAvatarPayload) => {
        setIsUploading(true);
        const payload = new FormData();
        payload.append('file', file);

        try {
            const response = await uploadInstance.post('/avatar', payload);
            const path = (response?.data?.path as string) || '';
            return path;
        } catch (error) {
            return '';
        } finally {
            setIsUploading(false);
        }
    };

    return {uploadAvatar, isUploading};
}
