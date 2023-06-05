// import logo from './logo.svg';
import ResBox from "./components/ResBox";
import "./App.css";

let data = {
  pagers : [[1,'on'],[2,'waiting'],[8,'off']],
}
function App() {
  return (
    <div className="App">
      {data.pagers.map((item) => (
        <ResBox number={item[0]} status={item[1]} />
      ))}
        {/* <ResBox number="5" color="var(--waiting_color)" />
        <ResBox number="1" color="var(--off_color)"/>
        <ResBox number="2" color="var(--turn_color)" /> */}
    </div>
  );
}

export default App;
