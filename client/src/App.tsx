import './App.css'
import MathBattleCoverPNG from './assets/MathBattleCover.png';

function App() {
  return (
    <>
      <div className="cover-image-container">
        <img src={MathBattleCoverPNG} alt="Math Battle Cover" style={{ width: '100%' }} />
      </div>
      <h1>Math Battle comming soon</h1>
    </>
  )
}

export default App
