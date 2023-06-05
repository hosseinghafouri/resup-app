// import photo from "./images/w.png";

function Icon(props) {
  return (
    <div className="icon" style={{ backgroundColor: props.colorValue }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-wifi"
        viewBox="0 0 16 16"
        color="#FFF"
      >
        <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z" />
        <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />
      </svg>
    </div>
  );
}

function Button_check(props) {
  const check = (event) => {
    console.log(event.target.parentElement.getAttribute("ip"));
  }

  return (
    <button className="check_btn" onClick={check} ip={props.ip}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-check-lg"
        viewBox="0 0 16 16"
      >
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
      </svg>
    </button>
  );
}
function Button_erorr(props) {
  const erorr = (event) => {
    console.log(event.target.parentElement.getAttribute("ip"));
  }
  return (
    <button className="erorr_btn" onClick={erorr} ip={props.ip}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
  );
}

function ResBox(props) {
  if (props.status === "on") {
    return (
      <div
        className="res_box"
        style={{ borderLeft: `5px solid var(--turn_color)` }}
      >
        <Icon colorValue="var(--turn_color)" />
        <p className="pager_num">پیجر شماره:{props.number}</p>
        <div className="button">
          <Button_erorr ip={props.ipURL} />
        </div>
      </div>
    );
  } else if (props.status === "waiting") {
    return (
      <div
        className="res_box"
        style={{ borderLeft: `5px solid var(--waiting_color)` }}
      >
        <Icon colorValue="var(--waiting_color)" />
        <p className="pager_num">پیجر شماره:{props.number}</p>
        <div className="button">
          <Button_check ip={props.ipURL} />
          <Button_erorr ip={props.ipURL} />
        </div>
      </div>
    );
  } else if (props.status === "off") {
    return (
      <div
        className="res_box"
        style={{ borderLeft: `5px solid var(--off_color)` }}
      >
        <Icon colorValue="var(--off_color)" />
        <p className="pager_num">پیجر شماره:{props.number}</p>
        <div className="button"></div>
      </div>
    );
  }
}

export default ResBox;
