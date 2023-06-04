import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TradingBots, Rules } from '../../screens'

const RoutePages = () => (
  // <Routes>
  //   <Route path="/tradingbots" element={<TradingBots />} />
      
  //   <Route path="rules" element={<Rules />} />
  // </Routes>
  <Router>
    <Routes>
      <Route path="/tradingbots" element={<TradingBots />} />
      <Route path="rules" element={<Rules />} />
    </Routes>
    
  </Router>
  );
  
  export default RoutePages;