import { useState, useEffect } from 'react'
import useApi from '../../Hooks/useApi'
import endpoints from '../../Services/endpoints'

const Dosen = () => {
  const [dosen, setDosen] = useState([])
  const { get, error, loading } = useApi()

  useEffect(() => {
    fetchDosen()
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await get(endpoints.DOSEN.GET)
      setDosen(response.data)
    } catch (error) {
      console.error('Error fetching dosen:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Dosen</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Tambah Dosen
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIDN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NUPTK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dosen.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data dosen
                  </td>
                </tr>
              ) : (
                dosen.map((item) => (
                  <tr key={item.kd_dosen}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nip || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nidn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nuptk || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.tgl_lahir ? new Date(item.tgl_lahir).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.kelamin === 'l' ? 'Laki-laki' : 'Perempuan'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.hp || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.email || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 1 ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dosen 