/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export const useAsync = (
    asyncFunction: () => Promise<AxiosResponse<unknown, unknown>>,
    successFunction: Function,
    returnFunction: Function = () => {},
    dependencies: unknown[] = []
) => {
    useEffect(() => {
        let isActive = true;
        asyncFunction().then((result) => {
            if (isActive) successFunction(result.data);
        });
        return () => {
            returnFunction();
            isActive = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};