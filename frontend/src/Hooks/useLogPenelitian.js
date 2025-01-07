import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useLogPenelitian = () => {
  const { get, post, put, del } = useApi()

  const getLogPenelitian = async () => {
    return await get(ENDPOINTS.LOG_PENELITIAN.GET)
  }

  const createLogPenelitian = async (data) => {
    return await post(ENDPOINTS.LOG_PENELITIAN.CREATE, data)
  }

  const updateLogPenelitian = async (id, data) => {
    return await put(ENDPOINTS.LOG_PENELITIAN.UPDATE(id), data)
  }

  const deleteLogPenelitian = async (id) => {
    return await del(ENDPOINTS.LOG_PENELITIAN.DELETE(id))
  }

  return {
    getLogPenelitian,
    createLogPenelitian,
    updateLogPenelitian,
    deleteLogPenelitian
  }
}

export default useLogPenelitian 