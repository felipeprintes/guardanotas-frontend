import './App.css';
import Header from './components/Header'
import TextField from './components/TextField'

function App() {
  return (
    <div className="App">

        <header className="App-header">
          <Header/>
        </header>
        
        <section>
          <TextField/>
        </section>

    </div>
  );
}

export default App;
