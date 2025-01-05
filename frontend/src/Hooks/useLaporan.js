import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useLaporan = () => {
  const { get } = useApi()

  const getLaporanPenelitian = async (params) => {
    return await get(ENDPOINTS.LAPORAN.PENELITIAN, params)
  }

  const getLaporanDosen = async (params) => {
    return await get(ENDPOINTS.LAPORAN.DOSEN, params)
  }

  const getLaporanStatus = async (params) => {
    return await get(ENDPOINTS.LAPORAN.STATUS, params)
  }

  return {
    getLaporanPenelitian,
    getLaporanDosen,
    getLaporanStatus
  }
}

export default useLaporan 