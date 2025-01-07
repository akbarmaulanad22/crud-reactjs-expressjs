import { useState, useEffect } from 'react'
import useDosen from '../../Hooks/useDosen'

const Dosen = () => {
  const [dosenList, setDosenList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { getDosen, deleteDosen } = useDosen()

  useEffect(() => {
    fetchData()
  },[]);

  const fetchData = async () => {
    try {
      const response = await getDosen()
      setDosenList(response.data)
      setError(null)
    } catch (error) {
      setError('Gagal mengambil data')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Dosen</h2>
        <button 
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Dosen
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Tambah Dosen</h3>
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
                <label className="block text-sm font-medium text-gray-700">NIP</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan NIP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">NIDN</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan NIDN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">NUPTK</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan NUPTK"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </select>
              </div> 

              <div>
                <label className="block text-sm font-medium text-gray-700">No. HP</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan nomor HP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
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
              {dosenList.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data dosen
                  </td>
                </tr>
              ) : (
                dosenList.map((item) => (
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