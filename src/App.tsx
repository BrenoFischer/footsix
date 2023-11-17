import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SelectGame from './routes/SelectGame'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<SelectGame />} />
      </Route>
    </Routes>
  )
}
