import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import GlobalStyles from './globalStyles.js'

import { Container } from './containers'

const Main = () => {
  const [input, setInput] = useState('')

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1>Cortin</h1>
        <input
          value={input}
          onInput={(e) => setInput(e.target.value)}
          type="text"
        />

        <p>{input}</p>
      </Container>
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'))
