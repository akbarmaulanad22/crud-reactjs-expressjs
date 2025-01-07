import { useState, useEffect } from 'react';
import useDokumen from '../../Hooks/useDokumen';

const Dokumen = () => {
  const [dokumenList, setDokumenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { getDokumen, deleteDokumen } = useDokumen();

  useEffect(() => {
    fetchData();
  }, );

  const fetchData = async () => {
    try {
      const response = await getDokumen();
      setDokumenList(response.data);
      setError(null);
    } catch (error) {
      setError('Gagal mengambil data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (kd_penelitian_dokumen) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deleteDokumen(kd_penelitian_dokumen);
        fetchData();
      } catch (error) {
        console.error('Error deleting dokumen:', error);
      }
    }
  };

  const getStatusLabel = (status) => {
    return status === 1 ? 'Disetujui' : 'Belum Disetujui';
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <h2 className="text-2xl font-bold">Daftar Dokumen Penelitian</h2>
        <button 
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Dokumen
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Tambah Dokumen</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kode Penelitian</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Proposal</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Surat Tugas</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Penelitian</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Dokumen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Penelitian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Proposal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surat Tugas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Penelitian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Penelitian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sertifikat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laporan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Laporan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dokumenList.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data dokumen
                  </td>
                </tr>
              ) : (
                dokumenList.map((dokumen) => (
                  <tr key={dokumen.kd_penelitian_dokumen} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{dokumen.kd_penelitian_dokumen}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{dokumen.kd_penelitian}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{dokumen.upload_proposal}</div>
                        <div className="text-sm text-gray-500">{formatDate(dokumen.tgl_upload_proposal)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        dokumen.status_proposal === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(dokumen.status_proposal)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{dokumen.upload_surat_tugas}</div>
                        <div className="text-sm text-gray-500">{formatDate(dokumen.tgl_upload_surat_tugas)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{dokumen.upload_penelitian}</div>
                        <div className="text-sm text-gray-500">{formatDate(dokumen.tgl_upload_penelitian)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        dokumen.status_penelitian === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(dokumen.status_penelitian)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{dokumen.upload_sertifikat}</div>
                        <div className="text-sm text-gray-500">{formatDate(dokumen.tgl_upload_sertifikat)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{dokumen.upload_laporan_penelitian}</div>
                        <div className="text-sm text-gray-500">{formatDate(dokumen.tgl_upload_laporan_penelitian)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        dokumen.status_laporan_penelitian === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusLabel(dokumen.status_laporan_penelitian)}
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
                        onClick={() => handleDelete(dokumen.kd_penelitian_dokumen)}
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

export default Dokumen; 