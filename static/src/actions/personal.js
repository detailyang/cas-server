import { PERSONAL_SAVE_REQUEST, PERSONAL_SAVE_SUCCESS, PERSONAL_SAVE_FAILURE } from '../constants'
import Antd from 'antd'
import { getValues } from 'redux-form'

import { CALL_API } from '../middleware/api'

export const savePersonal = () => 
  (dispatch, getState) => {
    const personal = getValues(getState().form.personal)
    dispatch({
      [CALL_API]: {
        types: [PERSONAL_SAVE_REQUEST, PERSONAL_SAVE_SUCCESS, PERSONAL_SAVE_FAILURE],
        endpoint: '/api/users/self',
        method: personal.id ? 'PUT': 'POST',
        body: personal,
        onSuccess: () => console.log('success'),
        onFail: error => Antd.message.error(error.message, 3)
      }
    })
  }