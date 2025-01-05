import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const usePenelitianAnggota = () => {
  const { get, post, put, del } = useApi()

  const getPenelitianAnggota = async () => {
    try {
      console.log('Fetching anggota...');
      const response = await get(ENDPOINTS.ANGGOTA_PENELITIAN.GET)
      console.log('Response:', response);
      return response
    } catch (error) {
      console.error('Error in getPenelitianAnggota:', error)
      throw error
    }
  }

  const createPenelitianAnggota = async (data) => {
    const anggotaData = {
      thn_akademik: data.thn_akademik,
      kd_penelitian: data.kd_penelitian,
      kd_dosen: data.kd_dosen,
      kd_mahasiswa: data.kd_mahasiswa,
      status: data.status
    }

    try {
      const response = await post(ENDPOINTS.ANGGOTA_PENELITIAN.CREATE, anggotaData)
      return response
    } catch (error) {
      console.error('Error in createPenelitianAnggota:', error)
      throw error
    }
  }

  const updatePenelitianAnggota = async (kd_anggota, data) => {
    const anggotaData = {
      thn_akademik: data.thn_akademik,
      kd_penelitian: data.kd_penelitian,
      kd_dosen: data.kd_dosen,
      kd_mahasiswa: data.kd_mahasiswa,
      status: data.status
    }

    try {
      const response = await put(ENDPOINTS.ANGGOTA_PENELITIAN.UPDATE(kd_anggota), anggotaData)
      return response
    } catch (error) {
      console.error('Error in updatePenelitianAnggota:', error)
      throw error
    }
  }

  const deletePenelitianAnggota = async (kd_anggota) => {
    try {
      const response = await del(ENDPOINTS.ANGGOTA_PENELITIAN.DELETE(kd_anggota))
      return response
    } catch (error) {
      console.error('Error in deletePenelitianAnggota:', error)
      throw error
    }
  }

  const getPenelitianAnggotaDetail = async (kd_anggota) => {
    try {
      const response = await get(ENDPOINTS.ANGGOTA_PENELITIAN.DETAIL(kd_anggota))
      return response
    } catch (error) {
      console.error('Error in getPenelitianAnggotaDetail:', error)
      throw error
    }
  }

  return {
    getPenelitianAnggota,
    createPenelitianAnggota,
    updatePenelitianAnggota,
    deletePenelitianAnggota,
    getPenelitianAnggotaDetail
  }
}

export default usePenelitianAnggota 