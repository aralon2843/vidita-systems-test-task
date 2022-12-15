import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import GlobalStyles from './styles/globalStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <GlobalStyles />
    <App />
  </>
);
