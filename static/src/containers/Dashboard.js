import React from 'react'
import { Nav, Header } from '../components'
import { connect } from 'react-redux'
import { logout } from '../actions'

function Dashboard ({ children, auth, location, logout }) {
  return (
    <div>
      <Header handleLogout={logout}/>
      <Nav isAdmin={ auth.isAdmin } currentPath={ location.pathname } />
      <div className="dashboard-container">{children}</div>
    </div>
  )
}


export default connect(
  ({auth})=>({auth}),
  { logout }
)(Dashboard)