import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AxiosCall } from '../models';

export const useService = <T>() => {
    const [loading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<T>) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);
        let result = {} as AxiosResponse<T>;
        try {
            result = await axiosCall.call; 
        } catch (err: unknown) {
            setLoading(false);
            console.error(err); // this is caught by axios interceptor 
        }
        setLoading(false);
        return result;
    };

    const cancelEndpoint = () => {
        setLoading(false);
        if (controller) controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, callEndpoint };
};
