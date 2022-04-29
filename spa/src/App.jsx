import { Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import Calculator from './components/Calculator';
import History from './components/History';

WebFont.load({
  google: {
    families: ["Open Sans", "VT323:500"]
  }
})

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Calculator /> }/>
      <Route path="/history" element={ <History /> }/>
    </Routes>
  );
}

export default App;
