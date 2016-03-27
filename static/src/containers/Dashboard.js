import React from 'react'
import Nav from '../components/Nav'
import { connect } from 'react-redux'

function Dashboard ({ children, auth, location }) {
  return (
    <div>
        <Nav isAdmin={ auth.isAdmin } currentPath={ location.pathname } />
        <div>{children}</div>
    </div>
  )
}


export default connect(({auth})=>({auth}))(Dashboard)