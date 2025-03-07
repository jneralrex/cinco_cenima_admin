import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, 
});

Api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accesstoken='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    console.error('Response Interceptor Triggered:', error);

    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refreshtoken`, {}, { withCredentials: true });

        document.cookie = `accesstoken=${data.token}; path=/; secure; SameSite=Strict`;
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return Api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        alert('Your session has expired. Please sign in again.');
        window.location.replace('/sign-in'); 
        return Promise.reject(refreshError);
      }
    }

    // if (error.response?.status === 500) {
    //   console.error('Server error occurred:', error.response.data);
    //   alert('An unexpected error occurred. Please try again later.');
    // }

    return Promise.reject(error);
  }
);

export default Api;
