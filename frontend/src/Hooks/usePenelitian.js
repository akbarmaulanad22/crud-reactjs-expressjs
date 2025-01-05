import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const usePenelitian = () => {
  const { get, post, put, del } = useApi()

  const getPenelitian = async () => {
    return await get(ENDPOINTS.PENELITIAN.GET)
  }

  const createPenelitian = async (data) => {
    return await post(ENDPOINTS.PENELITIAN.CREATE, data)
  }

  const updatePenelitian = async (id, data) => {
    return await put(ENDPOINTS.PENELITIAN.UPDATE(id), data)
  }

  const deletePenelitian = async (id) => {
    return await del(ENDPOINTS.PENELITIAN.DELETE(id))
  }

  const getPenelitianDetail = async (id) => {
    return await get(ENDPOINTS.PENELITIAN.DETAIL(id))
  }

  return {
    getPenelitian,
    createPenelitian,
    updatePenelitian,
    deletePenelitian,
    getPenelitianDetail
  }
}

export default usePenelitian 