import logo from './logo.svg';
import './App.css';
// import TradingBots from './screens/TradingBots/TradingBots';
// import NavigateBar from './components/navigateBar/navigateBar';
// import Rules from './screens/Rules/Rules'
import { NavigateBar, RoutePages } from './components'

function App() {
  return (
    <div className="App">
      <NavigateBar/>
      <RoutePages/>
    </div>
  );
}

export default App;
