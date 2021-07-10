import './App.css';
import Header from './components/Header/Header';
import Versus from './pages/Versus'
import SingleUser from './pages/SingleUser';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={SingleUser} />
        <Route path="/versus" component={Versus} />
      </Switch>
    </Router>
  );
}

export default App;
