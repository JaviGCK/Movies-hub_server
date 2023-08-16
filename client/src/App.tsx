import { ScoreProvider } from "./context/ScoreContext"
import { RouterPaths } from "./routes/RouterPaths.router"


function App() {


  return (
    <>
      <ScoreProvider>
        <RouterPaths />
      </ScoreProvider>
    </>
  )
}

export default App
