import { useState, useEffect } from 'react';
import usePenelitianAnggota from '../../Hooks/usePenelitianAnggota';
import useDosen from '../../Hooks/useDosen';
import useMahasiswa from '../../Hooks/useMahasiswa';
import usePenelitian from '../../Hooks/usePenelitian';

const PenelitianAnggota = () => {
  const [anggotaList, setAnggotaList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [penelitianList, setPenelitianList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState(null);
  
  const { getPenelitianAnggota, deletePenelitianAnggota, addPenelitianAnggota, updatePenelitianAnggota } = usePenelitianAnggota();
  const { getDosen } = useDosen();
  const { getMahasiswa } = useMahasiswa();
  const { getPenelitian } = usePenelitian();

  const [formData, setFormData] = useState({
    thn_akademik: '',
    kd_penelitian: '',
    kd_dosen: '',
    kd_mahasiswa: '',
    status: '1'
  });

  useEffect(() => {
    fetchData();
  }, );

  useEffect(() => {
    console.log('Current anggotaList:', anggotaList);
  }, [anggotaList]);

  const fetchData = async () => {
    try {
      const [anggotaResponse, dosenResponse, mahasiswaResponse, penelitianResponse] = await Promise.all([
        getPenelitianAnggota(),
        getDosen(),
        getMahasiswa(),
        getPenelitian()
      ]);
      setAnggotaList(anggotaResponse.data);
      setDosenList(dosenResponse.data);
      setMahasiswaList(mahasiswaResponse.data);
      setPenelitianList(penelitianResponse.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAnggota) {
        await updatePenelitianAnggota(selectedAnggota.kd_anggota, formData);
      } else {
        await addPenelitianAnggota(formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      thn_akademik: '',
      kd_penelitian: '',
      kd_dosen: '',
      kd_mahasiswa: '',
      status: '1'
    });
    setSelectedAnggota(null);
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
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedAnggota ? 'Edit Anggota Penelitian' : 'Tambah Anggota Penelitian'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tahun Akademik</label>
                  <input
                    type="text"
                    name="thn_akademik"
                    value={formData.thn_akademik}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Penelitian</label>
                  <select
                    name="kd_penelitian"
                    value={formData.kd_penelitian}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Penelitian</option>
                    {penelitianList.map((penelitian) => (
                      <option key={penelitian.kd_penelitian} value={penelitian.kd_penelitian}>
                        {penelitian.judul}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Dosen</label>
                  <select
                    name="kd_dosen"
                    value={formData.kd_dosen}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Dosen</option>
                    {dosenList.map((dosen) => (
                      <option key={dosen.kd_dosen} value={dosen.kd_dosen}>
                        {dosen.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mahasiswa</label>
                  <select
                    name="kd_mahasiswa"
                    value={formData.kd_mahasiswa}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Mahasiswa</option>
                    {mahasiswaList.map((mahasiswa) => (
                      <option key={mahasiswa.kd_mahasiswa} value={mahasiswa.kd_mahasiswa}>
                        {mahasiswa.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {selectedAnggota ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PenelitianAnggota; 