import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
