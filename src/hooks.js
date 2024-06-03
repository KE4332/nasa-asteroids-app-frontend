import { createContext, useEffect, useState } from 'react';

export function useFetch(start_date, end_date) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const API_URL = 'http://127.0.0.1:8000/api/asteroid/'
            try {
                const response = await fetch(`${API_URL}?start_date=${start_date}&end_date=${end_date}`);
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [start_date, end_date]);

    return { isLoading, data, error };
}