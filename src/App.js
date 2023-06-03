// import logo from './logo.svg';
import ResBox from "./components/ResBox";
import "./App.css";

function App() {
  return (
    <div className="App">
        <ResBox number="5" color="var(--off_color)" />
        <ResBox number="1" color="var(--turn_color" />
        <ResBox number="2" color="var(--waiting_color)" />
    </div>
  );
}

export default App;
