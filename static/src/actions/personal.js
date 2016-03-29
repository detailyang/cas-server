import { RESET_PERSONAL } from '../constants'
import Antd from 'antd'
import { fetch } from '../utils'

export const resetPersonal = (data) => ({
  type: RESET_PERSONAL,
  payload: data
})

export const submitPersonal = (values, dispatch) => 
  fetch('/api/users/self', {
    method: values.id ? 'PUT': 'POST',
    body: values,
  })
  .then(() => {
    resetPersonal(values)
    return values
  })

    