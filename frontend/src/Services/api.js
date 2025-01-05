import axios from 'axios';

const api = axios.create( {
  baseURL: 'http://localhost:3010/api',
  timeout: 300000, // Tambah timeout untuk upload file besar
  headers: {
    'Content-Type': 'application/json',
  }
} );

// Request interceptor
api.interceptors.request.use(
  ( config ) => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  ( error ) => {
    return Promise.reject( error );
  }
);

// Response interceptor
api.interceptors.response.use(
  ( response ) => {
    return response;
  },
  ( error ) => {
    if ( !error.response ) {
      console.error( 'Network Error - Tidak dapat terhubung ke server' );
      return Promise.reject( new Error( 'Tidak dapat terhubung ke server' ) );
    }

    switch ( error.response.status ) {
      case 401:
        localStorage.removeItem( 'token' );
        window.location.href = '/login';
        break;
      case 403:
        console.error( 'Akses ditolak' );
        break;
      case 404:
        console.error( 'Data tidak ditemukan' );
        break;
      case 500:
        console.error( 'Terjadi kesalahan server' );
        break;
      default:
        console.error( 'Terjadi kesalahan' );
    }
    return Promise.reject( error );
  }
);

export default api;