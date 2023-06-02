import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import AlertContext from './context/AlertContext.jsx'
import Alert from './components/Alert.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AlertContext>
    <Alert />
    <App />
  </AlertContext>,
)
