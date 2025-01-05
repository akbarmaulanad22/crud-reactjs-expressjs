import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Dosen from './Pages/Dosen'
import Mahasiswa from './Pages/Mahasiswa'
import Penelitian from './Pages/Penelitian'
import AnggotaPenelitian from './Pages/AnggotaPenelitian'
import Dokumen from './Pages/Dokumen'
import LogPenelitian from './Pages/LogPenelitian'
import Laporan from './Pages/Laporan'

const Content = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dosen" element={<Dosen />} />
        <Route path="/mahasiswa" element={<Mahasiswa />} />
        <Route path="/penelitian" element={<Penelitian />} />
        <Route path="/anggota-penelitian" element={<AnggotaPenelitian />} />
        <Route path="/dokumen" element={<Dokumen />} />
        <Route path="/log-penelitian" element={<LogPenelitian />} />
        <Route path="/laporan" element={<Laporan />} />
      </Routes>
    </main>
  )
}

export default Content
