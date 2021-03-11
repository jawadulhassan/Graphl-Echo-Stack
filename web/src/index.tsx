import ReactDOM from 'react-dom'
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'
import {ApolloProvider} from '@apollo/react-hooks'

import {Routes} from './Routes'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root'),
)
