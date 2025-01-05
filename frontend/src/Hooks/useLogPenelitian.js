import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useLogPenelitian = () => {
  const { get, post } = useApi()

  const getLogPenelitian = async () => {
    try {
      const response = await get(ENDPOINTS.LOG_PENELITIAN.GET)
      return response
    } catch (error) {
      console.error('Error in getLogPenelitian:', error)
      throw error
    }
  }

  const createLogPenelitian = async (data) => {
    const logData = {
      kd_penelitian: data.kd_penelitian,
      judul: data.judul,
      keterangan: data.keterangan,
      kd_dosen: data.kd_dosen,
      tgl_log: data.tgl_log
    }

    try {
      const response = await post(ENDPOINTS.LOG_PENELITIAN.CREATE, logData)
      return response
    } catch (error) {
      console.error('Error in createLogPenelitian:', error)
      throw error
    }
  }

  const getLogPenelitianDetail = async (id) => {
    try {
      const response = await get(ENDPOINTS.LOG_PENELITIAN.DETAIL(id))
      return response
    } catch (error) {
      console.error('Error in getLogPenelitianDetail:', error)
      throw error
    }
  }

  return {
    getLogPenelitian,
    createLogPenelitian,
    getLogPenelitianDetail
  }
}

export default useLogPenelitian 