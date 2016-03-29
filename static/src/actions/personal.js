import { RESET_PERSONAL, SAVE_PERSNOAL_FAILURE } from '../constants'
import Antd from 'antd'
import { fetch } from '../utils'

export const resetPersonal = (data) => ({
  type: RESET_PERSONAL,
  payload: data
})

const savePersonalFail = (errors) => ({
  type: SAVE_PERSNOAL_FAILURE,
  payload: {errors}
})

export const submitPersonal = (values, dispatch) => 
  fetch('/api/users/self', {
    method: values.id ? 'PUT': 'POST',
    body: values,
  })
  .then(() => {
    dispatch(resetPersonal(values))
    return values
  })
  .catch(error => {
    dispatch(savePersonalFail(error.data.errors))
    return Promise.reject(error)
  })

    