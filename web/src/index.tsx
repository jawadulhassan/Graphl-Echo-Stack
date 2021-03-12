import ReactDOM from 'react-dom'
import {
  ApolloClient,
  HttpLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {ApolloProvider} from '@apollo/react-hooks'

import {Routes} from './Routes'
import {getAccessToken} from './accessToken'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const accessToken = getAccessToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root'),
)
