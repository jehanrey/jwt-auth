import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  Login,
  Home,
  Register,
  Bye,
} from 'pages'
import { Header } from 'components'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/login" exact render={(props) => <Login {...props} />} />
        <Route path="/register" exact render={(props) => <Register {...props} />} />
        <Route path="/bye" exact render={() => <Bye />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
