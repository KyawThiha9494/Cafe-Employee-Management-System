import logo from './logo.svg';
import './App.css';
import { RouterProvider } from '@tanstack/react-router';
import router from './routes/routes';

function App() {
  return (
<div className="App">
      <RouterProvider router={router} /> {/* Provide the router to the app */}
    </div>
 
  );
}


export default App;
