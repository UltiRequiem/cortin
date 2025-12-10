import React, { useState } from 'react'
import { If } from 'react-extras'
import ReactDOM from 'react-dom'

import GlobalStyles from './globalStyles.js'

import { Container } from './containers'

const Main = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState({})

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1>Cortin</h1>
        <form
          onSubmit={(e) => {
            // Use relative URL to work with both local development and production
            fetch('/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'text/plain'
              },
              body: input
            })
              .then((va) => va.json())
              .then((val) => setData(val))

            e.preventDefault()
          }}
        >
          <label>
            Link:
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <If condition={input !== ''}>
          <p> {data.shortLink ? `Response : ${JSON.stringify(data)}` : "Something gone wrong"}</p>
        </If>

      </Container>
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
