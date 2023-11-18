import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SelectGame from './routes/SelectGame'
import OnGoingMatch from './routes/OnGoingMatch'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<SelectGame />} />
        <Route path="onGoingMatch" element={<OnGoingMatch />} />
      </Route>
    </Routes>
  )
}
