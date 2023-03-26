import LoginForm from 'pages/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginForm onSuccess={() => console.log("sdd")}/>
    </div>
  );
}

export default App;
