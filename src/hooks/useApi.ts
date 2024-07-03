
import { useState, useCallback } from 'react';
import axios from 'axios';
import { domain } from '../config';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export function useFetch() {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (route: string, method: RequestMethod = 'GET', body: any = null, _domain = domain) => {
        setError(null);

        try {
            const options = {
                method,
                url: `${_domain}${route}`,
                data: body,
            };
            const response = await axios(options);
            setData(response.data); // עדכון ה-state עם הנתונים מהקריאה ל-API
            console.log("data in useapi " + response.data); 
            return response.data; // החזרת הנתונים מהשרת
        } catch (error: any) {
            setError(error.message);
        }

    }, []);

    return { data, error, fetchData };
}
