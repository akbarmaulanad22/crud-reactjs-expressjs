import { useState, useEffect } from 'react';
import usePenelitian from '../../Hooks/usePenelitian';
import useDosen from '../../Hooks/useDosen';

const Penelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPenelitian, deletePenelitian } = usePenelitian();
  const { getDosen } = useDosen();

  useEffect(() => {
    fetchData();
  },);

  const fetchData = async () => {
    try {
      const [penelitianResponse, dosenResponse] = await Promise.all([
        getPenelitian(),
        getDosen()
      ]);
      setPenelitianList(penelitianResponse.data);
      setDosenList(dosenResponse.data);
      setError(null);
    } catch (error) {
      setError('Gagal mengambil data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (kd_penelitian) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deletePenelitian(kd_penelitian);
        fetchData(); // Refresh data setelah menghapus
      } catch (error) {
        console.error('Error deleting penelitian:', error);
      }
    }
  };

  const getDosenName = (kd_dosen) => {
    const dosen = dosenList.find(d => d.kd_dosen === kd_dosen);
    return dosen ? dosen.nama : '-';
  };

  const getStatusLabel = (status) => {
    return status === 1 ? 'Aktif' : 'Tidak Aktif';
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
        <h2 className="text-2xl font-bold">Daftar Penelitian</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tambah Penelitian
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Akademik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Dosen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Dosen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Akhir</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {penelitianList.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data penelitian
                  </td>
                </tr>
              ) : (
                penelitianList.map((penelitian) => (
                  <tr key={penelitian.kd_penelitian} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{penelitian.thn_akademik}</td>
                    <td className="px-6 py-4">{penelitian.judul}</td>
                    <td className="px-6 py-4">{penelitian.lokasi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{penelitian.kd_dosen}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getDosenName(penelitian.kd_dosen)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(penelitian.tanggal_mulai)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(penelitian.tanggal_akhir)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        penelitian.status === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(penelitian.status)}
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
                        onClick={() => handleDelete(penelitian.kd_penelitian)}
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

export default Penelitian; 