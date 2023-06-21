// import logo from './logo.svg';
import ResBox from "./components/ResBox";
import Header from "./components/Header"
import "./App.css";

let data = {
  pagers : [[1,'on','192.168.1.4'],[2,'waiting','172.168.2.7'],[8,'off', '192.128.1.8']],
}
function App() {
  return (
    <div>
    <Header />
    
    <div className="App">
      {data.pagers.map((item) => (
        <ResBox number={item[0]} status={item[1]} ipURL={item[2]} />
      ))}
        {/* <ResBox number="5" color="var(--waiting_color)" />
        <ResBox number="1" color="var(--off_color)"/>
        <ResBox number="2" color="var(--turn_color)" /> */}
    </div>
    </div>
  );
}

export default App;
