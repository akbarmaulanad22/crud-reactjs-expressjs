import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useLogPenelitian = () => {
  const { get } = useApi()

  const getLog = async () => {
    return await get(ENDPOINTS.LOG_PENELITIAN.GET)
  }

  const getLogDetail = async (id) => {
    return await get(ENDPOINTS.LOG_PENELITIAN.DETAIL(id))
  }

  return {
    getLog,
    getLogDetail
  }
}

export default useLogPenelitian 