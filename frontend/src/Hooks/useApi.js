import { useState } from 'react'
import axios from 'axios'

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // Add request interceptor for auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  const get = async (url, params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(url, { params })
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const post = async (url, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post(url, data)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const put = async (url, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.put(url, data)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const del = async (url) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.delete(url)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const upload = async (url, file, onProgress) => {
    try {
      setLoading(true)
      setError(null)
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress?.(percentCompleted)
        }
      })
      
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat upload')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
    upload
  }
}

export default useApi