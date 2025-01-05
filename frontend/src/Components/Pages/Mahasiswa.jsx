import { useState, useEffect } from 'react';
import useMahasiswa from '../../Hooks/useMahasiswa';

const Mahasiswa = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getMahasiswa } = useMahasiswa();

  useEffect(() => {
    fetchMahasiswa();
  },);

  const fetchMahasiswa = async () => {
    try {
      const response = await getMahasiswa();
      setMahasiswaList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mahasiswa:', error);
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    return status === 1 ? 'Aktif' : 'Tidak Aktif';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Mahasiswa</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mahasiswaList.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">Tidak ada data mahasiswa</td>
                </tr>
              ) : (
                mahasiswaList.map((mahasiswa) => (
                  <tr key={mahasiswa.kd_mahasiswa}>
                    <td className="px-6 py-4 whitespace-nowrap">{mahasiswa.npm}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{mahasiswa.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(mahasiswa.tgl_lahir)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{mahasiswa.kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{mahasiswa.hp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{mahasiswa.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        mahasiswa.status === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(mahasiswa.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
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

export default Mahasiswa; 