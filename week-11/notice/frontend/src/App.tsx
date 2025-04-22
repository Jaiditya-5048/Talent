import './App.css'
import { NoticeProvider } from './context/noticeContext'
import Landing from './pages/Landing'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <NoticeProvider >
    <Landing />
    </ NoticeProvider >
    </>
  )
}

export default App
