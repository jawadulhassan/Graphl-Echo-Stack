// import { useHelloQuery } from "./generated/graphql";

// function App() {
//   const { data, loading } = useHelloQuery();

//   if (loading) return <h1>Loading</h1>;

//   return <h1>{data?.hello}</h1>;
// }

// export default App;

import React from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

import {Bye} from './pages/Bye'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Register} from './pages/Register'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <div>
          <Link to="/">home</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/bye">Bye</Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bye" component={Bye} />
      </Switch>
    </BrowserRouter>
  )
}
