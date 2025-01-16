import axios from 'axios';
const token = localStorage.getItem('authToken');
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'localhost',
  headers: {
    //'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response) {
          const { status, data } = error.response;
          const navigate = useNavigate();
          if (status === 401) {
              if (data.code == 'TOKEN_MISSING') {
                  console.error('Falta el token, redirigiendo...');
                  navigate('/login');
              } else if (data.code == 'TOKEN_INVALID') {
                  console.error('Token inválido o expirado, redirigiendo...');
                  navigate('/login');
              }
          }
      }
      return Promise.reject(error);
  }
);

export default api;