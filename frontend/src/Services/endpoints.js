export const endpoints = {
  // Dosen
  DOSEN: {
    GET: 'api/dosen',
    CREATE: '/dosen',
    UPDATE: (id) => `/dosen/${id}`,
    DELETE: (id) => `/dosen/${id}`,
    DETAIL: (id) => `/dosen/${id}`,
  },

  // Mahasiswa 
  MAHASISWA: {
    GET: '/mahasiswa',
    CREATE: '/mahasiswa',
    UPDATE: (id) => `/mahasiswa/${id}`,
    DELETE: (id) => `/mahasiswa/${id}`,
    DETAIL: (id) => `/mahasiswa/${id}`,
  },

  // Penelitian
  PENELITIAN: {
    GET: '/penelitian',
    CREATE: '/penelitian',
    UPDATE: (id) => `/penelitian/${id}`,
    DELETE: (id) => `/penelitian/${id}`,
    DETAIL: (id) => `/penelitian/${id}`,
  },

  // Anggota Penelitian
  ANGGOTA_PENELITIAN: {
    GET: '/penelitian-anggota',
    CREATE: '/penelitian-anggota',
    UPDATE: (id) => `/penelitian-anggota/${id}`,
    DELETE: (id) => `/penelitian-anggota/${id}`,
    DETAIL: (id) => `/penelitian-anggota/${id}`,
  },

  // Dokumen Penelitian
  DOKUMEN: {
    GET: '/penelitian-dokumen',
    CREATE: '/penelitian-dokumen',
    UPDATE: (id) => `/penelitian-dokumen/${id}`,
    DELETE: (id) => `/penelitian-dokumen/${id}`,
    DETAIL: (id) => `/penelitian-dokumen/${id}`,
    UPLOAD: '/penelitian-dokumen/upload',
  },

  // Log Penelitian
  LOG_PENELITIAN: {
    GET: '/penelitian-log',
    CREATE: '/penelitian-log',
    DETAIL: (id) => `/penelitian-log/${id}`,
  },

  // Database
  DATABASE: {
    BACKUP: '/database/backup',
    RESTORE: '/database/restore'
  }
};

export default endpoints;