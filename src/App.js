import './App.css';
import Weather from './components/Weather';
import Clouds from './media/Clouds.mp4';

function App() {
  return (
    <div className="App">
      <video src={Clouds} autoPlay loop muted></video>
      <Weather/>
    </div>
  );
}

export default App;
