// import logo from './logo.svg';
import ResBox from "./components/ResBox";
import "./App.css";



function App(props) {
  let data = {
    pagers : props.argument,
  }
  console.log(data.pagers);
  return (
    <div>

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
