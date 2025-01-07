import { useState, useEffect } from 'react';
import usePenelitian from '../../Hooks/usePenelitian';
import useDosen from '../../Hooks/useDosen';

const Penelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPenelitian, deletePenelitian, addPenelitian, updatePenelitian } = usePenelitian();
  const { getDosen } = useDosen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPenelitian, setSelectedPenelitian] = useState(null);
  const [formData, setFormData] = useState({
    kd_penelitian: '',
    thn_akademik: '',
    judul: '',
    lokasi: '',
    tanggal_mulai: '',
    tanggal_akhir: '',
    kd_dosen: '',
    status: '1'
  });

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
      if (selectedPenelitian) {
        // Edit existing penelitian
        await updatePenelitian(selectedPenelitian.kd_penelitian, formData);
      } else {
        // Add new penelitian
        await addPenelitian(formData);
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
      kd_penelitian: '',
      thn_akademik: '',
      judul: '',
      lokasi: '',
      tanggal_mulai: '',
      tanggal_akhir: '',
      kd_dosen: '',
      status: '1'
    });
    setSelectedPenelitian(null);
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
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
                        onClick={() => {
                          setSelectedPenelitian(penelitian);
                          setFormData({
                            kd_penelitian: penelitian.kd_penelitian,
                            thn_akademik: penelitian.thn_akademik,
                            judul: penelitian.judul,
                            lokasi: penelitian.lokasi,
                            tanggal_mulai: penelitian.tanggal_mulai,
                            tanggal_akhir: penelitian.tanggal_akhir,
                            kd_dosen: penelitian.kd_dosen,
                            status: penelitian.status.toString()
                          });
                        }}
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedPenelitian ? 'Edit Penelitian' : 'Tambah Penelitian'}
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
                  <label className="block text-sm font-medium text-gray-700">Kode Penelitian</label>
                  <input
                    type="text"
                    name="kd_penelitian"
                    value={formData.kd_penelitian}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

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
                  <label className="block text-sm font-medium text-gray-700">Judul</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                  <input
                    type="date"
                    name="tanggal_mulai"
                    value={formData.tanggal_mulai}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Akhir</label>
                  <input
                    type="date"
                    name="tanggal_akhir"
                    value={formData.tanggal_akhir}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
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
                    {selectedPenelitian ? 'Update' : 'Simpan'}
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

export default Penelitian; 