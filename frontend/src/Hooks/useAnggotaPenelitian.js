import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useAnggotaPenelitian = () => {
  const { get, post, put, del } = useApi()

  const getAnggota = async () => {
    return await get(ENDPOINTS.ANGGOTA_PENELITIAN.GET)
  }

  const createAnggota = async (data) => {
    return await post(ENDPOINTS.ANGGOTA_PENELITIAN.CREATE, data)
  }

  const updateAnggota = async (id, data) => {
    return await put(ENDPOINTS.ANGGOTA_PENELITIAN.UPDATE(id), data)
  }

  const deleteAnggota = async (id) => {
    return await del(ENDPOINTS.ANGGOTA_PENELITIAN.DELETE(id))
  }

  const getAnggotaDetail = async (id) => {
    return await get(ENDPOINTS.ANGGOTA_PENELITIAN.DETAIL(id))
  }

  return {
    getAnggota,
    createAnggota,
    updateAnggota,
    deleteAnggota,
    getAnggotaDetail
  }
}

export default useAnggotaPenelitian 