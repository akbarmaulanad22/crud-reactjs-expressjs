import axios from 'axios';
import ENDPOINTS from './endpoints';

const api = axios.create({
    baseURL: 'http://localhost:3010/api',
    timeout: 300000, // Tambah timeout untuk upload file besar
    headers: {
      'Content-Type': 'application/json',
    }
  });

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error('Network Error - Tidak dapat terhubung ke server');
      return Promise.reject(new Error('Tidak dapat terhubung ke server'));
    }

    switch (error.response.status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        console.error('Akses ditolak');
        break;
      case 404:
        console.error('Data tidak ditemukan');
        break;
      case 500:
        console.error('Terjadi kesalahan server');
        break;
      default:
        console.error('Terjadi kesalahan');
    }
    return Promise.reject(error);
  }
);

// API Services
export const dosenAPI = {
  getAll: () => api.get(ENDPOINTS.DOSEN.GET),
  getById: (id) => api.get(ENDPOINTS.DOSEN.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.DOSEN.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.DOSEN.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.DOSEN.DELETE(id)),
};

export const mahasiswaAPI = {
  getAll: () => api.get(ENDPOINTS.MAHASISWA.GET),
  getById: (id) => api.get(ENDPOINTS.MAHASISWA.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.MAHASISWA.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.MAHASISWA.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.MAHASISWA.DELETE(id)),
};

export const penelitianAPI = {
  getAll: () => api.get(ENDPOINTS.PENELITIAN.GET),
  getById: (id) => api.get(ENDPOINTS.PENELITIAN.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.PENELITIAN.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.PENELITIAN.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.PENELITIAN.DELETE(id)),
};

export const penelitianAnggotaAPI = {
  getAll: () => api.get(ENDPOINTS.ANGGOTA_PENELITIAN.GET),
  getById: (id) => api.get(ENDPOINTS.ANGGOTA_PENELITIAN.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.ANGGOTA_PENELITIAN.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.ANGGOTA_PENELITIAN.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.ANGGOTA_PENELITIAN.DELETE(id)),
};

export const penelitianDokumenAPI = {
  getAll: () => api.get(ENDPOINTS.DOKUMEN.GET),
  getById: (id) => api.get(ENDPOINTS.DOKUMEN.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.DOKUMEN.CREATE, data),
  update: (id, data) => api.put(ENDPOINTS.DOKUMEN.UPDATE(id), data),
  delete: (id) => api.delete(ENDPOINTS.DOKUMEN.DELETE(id)),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(ENDPOINTS.DOKUMEN.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const penelitianLogAPI = {
  getAll: () => api.get(ENDPOINTS.LOG_PENELITIAN.GET),
  getById: (id) => api.get(ENDPOINTS.LOG_PENELITIAN.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.LOG_PENELITIAN.CREATE, data),
};

export const databaseAPI = {
  backup: () => api.get(ENDPOINTS.DATABASE.BACKUP),
  restore: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(ENDPOINTS.DATABASE.RESTORE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;