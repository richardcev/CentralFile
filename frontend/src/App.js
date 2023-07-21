import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


function App() {

  return (
    <div className="home-container">
      <Link to="/login">
        <Button type="primary" size="large" className="large-button">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button type="primary" size="large" className="large-button">
          Register
        </Button>
      </Link>
    </div>
  );
}

export default App;
