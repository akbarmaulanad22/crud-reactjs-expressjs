const Laporan = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Laporan</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Laporan
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>Laporan Penelitian per Periode</option>
              <option>Laporan per Dosen</option>
              <option>Laporan Status Penelitian</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>2024/2025</option>
              <option>2023/2024</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Generate Laporan
        </button>
      </div>
    </div>
  )
}

export default Laporan 