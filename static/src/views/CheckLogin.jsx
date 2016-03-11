import './login.scss'

import React from 'react'
import {Spin} from 'antd'

export default React.createClass({

    render() {
        return (
            <div className='check-login'>
                <Spin />
            </div>
        )
    }
})
