import useApi from './useApi'
import ENDPOINTS from '../Services/endpoints'

const useDokumen = () => {
  const { get, post, put, del, upload } = useApi()

  const getDokumen = async () => {
    return await get(ENDPOINTS.DOKUMEN.GET)
  }

  const createDokumen = async (data) => {
    return await post(ENDPOINTS.DOKUMEN.CREATE, data)
  }

  const updateDokumen = async (id, data) => {
    return await put(ENDPOINTS.DOKUMEN.UPDATE(id), data)
  }

  const deleteDokumen = async (id) => {
    return await del(ENDPOINTS.DOKUMEN.DELETE(id))
  }

  const getDokumenDetail = async (id) => {
    return await get(ENDPOINTS.DOKUMEN.DETAIL(id))
  }

  const uploadDokumen = async (file, onProgress) => {
    return await upload(ENDPOINTS.DOKUMEN.UPLOAD, file, onProgress)
  }

  return {
    getDokumen,
    createDokumen,
    updateDokumen,
    deleteDokumen,
    getDokumenDetail,
    uploadDokumen
  }
}

export default useDokumen 