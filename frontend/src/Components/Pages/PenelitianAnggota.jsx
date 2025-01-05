import { useState, useEffect } from 'react';
import usePenelitianAnggota from '../../Hooks/usePenelitianAnggota';

const PenelitianAnggota = () => {
  const [anggotaList, setAnggotaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getPenelitianAnggota, deletePenelitianAnggota } = usePenelitianAnggota();

  useEffect(() => {
    fetchData();
  }, );

  useEffect(() => {
    console.log('Current anggotaList:', anggotaList);
  }, [anggotaList]);

  const fetchData = async () => {
    try {
      const response = await getPenelitianAnggota();
      console.log('Response anggota:', response);
      setAnggotaList(response.data);
      setError(null);
    } catch (error) {
      console.error('Error detail:', error);
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (kd_anggota) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deletePenelitianAnggota(kd_anggota);
        fetchData();
      } catch (error) {
        console.error('Error deleting anggota:', error);
      }
    }
  };

  const getStatusLabel = (status) => {
    return status === 1 ? 'Aktif' : 'Tidak Aktif';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Anggota Penelitian</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tambah Anggota
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Anggota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Akademik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Penelitian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Dosen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Mahasiswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anggotaList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data anggota penelitian
                  </td>
                </tr>
              ) : (
                anggotaList.map((anggota) => (
                  <tr key={anggota.kd_anggota} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{anggota.kd_anggota}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{anggota.thn_akademik}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{anggota.kd_penelitian}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{anggota.kd_dosen}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{anggota.kd_mahasiswa}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        anggota.status === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(anggota.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(anggota.kd_anggota)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PenelitianAnggota; 