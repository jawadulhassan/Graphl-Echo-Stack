import React, {useState} from 'react'

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        console.log('form submitted')
        console.log(email, password)
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
      <button type="submit">Submit</button>
    </form>
  )
}
