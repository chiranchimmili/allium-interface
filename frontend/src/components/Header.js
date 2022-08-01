import "./Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const startTest = () => {
    let output_console = document.querySelector(".console");
    let row = document.createElement("tr");
    let title = document.createElement("th");
    title.innerHTML = "Info";
    let time = document.createElement("th");
    time.innerHTML = new Date().toLocaleTimeString("en-GB");
    let desc = document.createElement("th");
    desc.innerHTML = "Starting test...";
    row.appendChild(title);
    row.appendChild(time);
    row.appendChild(desc);
    row.style.color = "#09aad3";
    output_console.appendChild(row);
    output_console.scrollTop = output_console.scrollHeight;
  };

  return (
    <div className="header">
      <div className="control-buttons">
        <button id="start-button" onClick={startTest}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#32CD32"
            className="bi bi-play-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
        </button>
        <button id="end-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="red"
            className="bi bi-stop-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
          </svg>
        </button>
        <button id="pause-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="blue"
            class="bi bi-pause-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
          </svg>
        </button>
      </div>
      <div className="logo"></div>
    </div>
  );
};

export default Header;
