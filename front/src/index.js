import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import "./fonts/osrs-font.woff"

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://immense-ridge-37267.herokuapp.com/graphql",
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
