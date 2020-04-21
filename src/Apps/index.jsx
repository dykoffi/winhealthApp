import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

//importation des differentes applications
const Connexion = React.lazy(() => import('./connexion'))
const Admin = React.lazy(() => import('./admin'))

const App = () => {
  return (
    <div id="App" className="row" >
      <Route render={() => {
        const cookies = new Cookies()
        return ( cookies.get("user",{path:'/'}) ? <Redirect to={`/${cookies.get("currentPage",{path:'/'})}/`} /> : <Redirect to='/connexion' />)
      }} />
      {/* ces routes representent les differentes application */}
      <Route path='/connexion' component={Connexion} />
      <Route path='/admin' component={Admin} />
    </div>
  )
}
export default App