import { useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";

const useAsync = () => {
  const [status, setStatus] = useState<{
    loading: boolean;
    error?: Error;
    data?: any;
  }>({
    loading: false,
  });

  const runApi = useCallback(
    (url: string) => {
      setStatus({ loading: true });
      axios(url)
        .then((res: AxiosResponse) => {
          setStatus({ loading: false, data: res.data });
        })
        .catch((error: Error) => {
          setStatus({ loading: false, error });
        });
    },
    [setStatus]
  );

  return { ...status, runApi };
};

export default useAsync;
