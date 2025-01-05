import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useMahasiswa = () => {
  const { get, post, put, del } = useApi()

  const getMahasiswa = async () => {
    return await get(ENDPOINTS.MAHASISWA.GET)
  }

  const createMahasiswa = async (data) => {
    return await post(ENDPOINTS.MAHASISWA.CREATE, data)
  }

  const updateMahasiswa = async (id, data) => {
    return await put(ENDPOINTS.MAHASISWA.UPDATE(id), data)
  }

  const deleteMahasiswa = async (id) => {
    return await del(ENDPOINTS.MAHASISWA.DELETE(id))
  }

  const getMahasiswaDetail = async (id) => {
    return await get(ENDPOINTS.MAHASISWA.DETAIL(id))
  }

  return {
    getMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    getMahasiswaDetail
  }
}

export default useMahasiswa 