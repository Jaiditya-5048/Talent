import './App.css'
import Nav from './components/Nav'
import { NoticeProvider } from './context/noticeContext'
import Landing from './pages/Landing'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <NoticeProvider >
      <Nav />
    <Landing />
    </ NoticeProvider >
    </>
  )
}

export default App
