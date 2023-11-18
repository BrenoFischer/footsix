import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GameContextProvider } from './contexts/GameContext.tsx'
import { OnGoingMatchContextProvider } from './contexts/OnGoingMatchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <GameContextProvider>
        <OnGoingMatchContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </OnGoingMatchContextProvider>
      </GameContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
