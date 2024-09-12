
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StateProvider } from './context/StateContext';
import Login from './pages/Login/Login';
import Quotes from './pages/Quotes/Quotes';
import { NotFound } from './component/404';
import './App.css'
import NewQuote from './pages/NewQuote/NewQuote';

const App = () => {
  
  return (
    <StateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="quote/*" element={<Quotes />} />
        <Route path="new-quote/*" element={<NewQuote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </StateProvider>
  );
}

export default App;