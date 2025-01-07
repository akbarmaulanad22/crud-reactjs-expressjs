import { useState, useEffect } from 'react';
import useLogPenelitian from '../../Hooks/useLogPenelitian';

const LogPenelitian = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [formData, setFormData] = useState({
    kd_penelitian: '',
    tanggal: '',
    aktivitas: '',
    status: '1',
    keterangan: ''
  },[]);

  const { getLogPenelitian, createLogPenelitian, updateLogPenelitian, deleteLogPenelitian } = useLogPenelitian();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getLogPenelitian();
      setLogs(response.data);
      setError(null);
    } catch (error) {
      setError('Gagal mengambil data log');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
      if (selectedLog) {
        await updateLogPenelitian(selectedLog.id, formData);
      } else {
        await createLogPenelitian(formData);
      }
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error submitting log:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus log ini?')) {
      try {
        await deleteLogPenelitian(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting log:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      kd_penelitian: '',
      tanggal: '',
      aktivitas: '',
      status: '1',
      keterangan: ''
    });
    setSelectedLog(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Log Pengerjaan Penelitian</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Log
        </button>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Aktivitas</label>
                <textarea
                  name="aktivitas"
                  value={formData.aktivitas}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1">Selesai</option>
                  <option value="0">Belum Selesai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
                >
                  {selectedLog ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Kode Penelitian</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Aktivitas</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Keterangan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{log.kd_penelitian}</td>
                <td className="py-3 px-6 text-left">{log.tanggal}</td>
                <td className="py-3 px-6 text-left">{log.aktivitas}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    log.status === '1' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {log.status === '1' ? 'Selesai' : 'Belum Selesai'}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{log.keterangan}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      setSelectedLog(log);
                      setFormData(log);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-600 hover:text-red-900 mx-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogPenelitian; 