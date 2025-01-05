import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useDosen = () => {
  const { get, post, put, del } = useApi()

  const getDosen = async () => {
    return await get(ENDPOINTS.DOSEN.GET)
  }

  const createDosen = async (data) => {
    return await post(ENDPOINTS.DOSEN.CREATE, data)
  }

  const updateDosen = async (id, data) => {
    return await put(ENDPOINTS.DOSEN.UPDATE(id), data)
  }

  const deleteDosen = async (id) => {
    return await del(ENDPOINTS.DOSEN.DELETE(id))
  }

  const getDosenDetail = async (id) => {
    return await get(ENDPOINTS.DOSEN.DETAIL(id))
  }

  return {
    getDosen,
    createDosen,
    updateDosen,
    deleteDosen,
    getDosenDetail
  }
}

export default useDosen 