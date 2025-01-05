import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useDokumen = () => {
  const { get, post, put, del } = useApi()

  const getDokumen = async () => {
    try {
      const response = await get(ENDPOINTS.DOKUMEN.GET)
      return response
    } catch (error) {
      console.error('Error in getDokumen:', error)
      throw error
    }
  }

  const createDokumen = async (data) => {
    const dokumenData = {
      kd_penelitian: data.kd_penelitian,
      upload_proposal: data.upload_proposal,
      tgl_upload_proposal: data.tgl_upload_proposal,
      status_proposal: data.status_proposal,
      tgl_status_proposal: data.tgl_status_proposal,
      upload_surat_tugas: data.upload_surat_tugas,
      tgl_upload_surat_tugas: data.tgl_upload_surat_tugas,
      upload_penelitian: data.upload_penelitian,
      tgl_upload_penelitian: data.tgl_upload_penelitian,
      status_penelitian: data.status_penelitian,
      tgl_status_penelitian: data.tgl_status_penelitian,
      upload_sertifikat: data.upload_sertifikat,
      tgl_upload_sertifikat: data.tgl_upload_sertifikat,
      upload_laporan_penelitian: data.upload_laporan_penelitian,
      tgl_upload_laporan_penelitian: data.tgl_upload_laporan_penelitian,
      status_laporan_penelitian: data.status_laporan_penelitian,
      tgl_status_laporan_penelitian: data.tgl_status_laporan_penelitian
    }

    try {
      const response = await post(ENDPOINTS.DOKUMEN.CREATE, dokumenData)
      return response
    } catch (error) {
      console.error('Error in createDokumen:', error)
      throw error
    }
  }

  const updateDokumen = async (kd_penelitian_dokumen, data) => {
    const dokumenData = {
      kd_penelitian: data.kd_penelitian,
      upload_proposal: data.upload_proposal,
      tgl_upload_proposal: data.tgl_upload_proposal,
      status_proposal: data.status_proposal,
      tgl_status_proposal: data.tgl_status_proposal,
      upload_surat_tugas: data.upload_surat_tugas,
      tgl_upload_surat_tugas: data.tgl_upload_surat_tugas,
      upload_peneilitan: data.upload_peneilitan,
      tgl_upload_peneilitan: data.tgl_upload_peneilitan,
      status_penelitian: data.status_penelitian,
      tgl_status_penelitian: data.tgl_status_penelitian,
      upload_sertifikat: data.upload_sertifikat,
      tgl_upload_sertifikat: data.tgl_upload_sertifikat,
      upload_laporan_penelitian: data.upload_laporan_penelitian,
      tgl_upload_laporan_penelitian: data.tgl_upload_laporan_penelitian,
      status_laporan_penelitian: data.status_laporan_penelitian,
      tgl_status_laporan_penelitian: data.tgl_status_laporan_penelitian
    }

    try {
      const response = await put(ENDPOINTS.DOKUMEN.UPDATE(kd_penelitian_dokumen), dokumenData)
      return response
    } catch (error) {
      console.error('Error in updateDokumen:', error)
      throw error
    }
  }

  const deleteDokumen = async (kd_penelitian_dokumen) => {
    try {
      const response = await del(ENDPOINTS.DOKUMEN.DELETE(kd_penelitian_dokumen))
      return response
    } catch (error) {
      console.error('Error in deleteDokumen:', error)
      throw error
    }
  }

  const getDokumenDetail = async (kd_penelitian_dokumen) => {
    try {
      const response = await get(ENDPOINTS.DOKUMEN.DETAIL(kd_penelitian_dokumen))
      return response
    } catch (error) {
      console.error('Error in getDokumenDetail:', error)
      throw error
    }
  }

  return {
    getDokumen,
    createDokumen,
    updateDokumen,
    deleteDokumen,
    getDokumenDetail
  }
}

export default useDokumen 