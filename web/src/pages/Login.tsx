import React, {useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'

import { setAccessToken } from '../accessToken'
import {useLoginMutation} from '../generated/graphql'

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useLoginMutation()

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        console.log('form submitted')
        const response = await login({
          variables: {
            email,
            password,
          },
        })

        if(response?.data){
          setAccessToken(response?.data?.login?.accessToken)
        }
        console.log({response})
        history.push('/')
      }}
    >
      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
