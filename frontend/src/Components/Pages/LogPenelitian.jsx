import { useState, useEffect } from 'react';
import useLogPenelitian from '../../Hooks/useLogPenelitian';

const LogPenelitian = () => {
  const [logList, setLogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getLogPenelitian } = useLogPenelitian();

  useEffect(() => {
    fetchData();
  }, );

  const fetchData = async () => {
    try {
      const response = await getLogPenelitian();
      setLogList(response.data);
      setError(null);
    } catch (error) {
      setError('Gagal mengambil data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-bold">Log Penelitian</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Log</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Penelitian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Dosen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Log</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data log penelitian
                  </td>
                </tr>
              ) : (
                logList.map((log) => (
                  <tr key={log.kd_penelitian_log} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{log.kd_penelitian_log}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.kd_penelitian}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.judul}</td>
                    <td className="px-6 py-4">{log.keterangan}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{log.kd_dosen}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(log.tgl_log)}</td>
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

export default LogPenelitian; 