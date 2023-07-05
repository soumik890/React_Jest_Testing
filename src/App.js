import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .get("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{user.name}</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input
          data-testid="username"
          value={val}
          placeholder="Enter Username here"
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
        <input
          data-testid="password"
          value={val2}
          placeholder="Enter password"
          type="password"
          onChange={(e) => {
            setVal2(e.target.value);
          }}
        />
        <button
          disabled={val == "" || val2 == "" ? true : false}
          // disabled={!val || !val2}    This also works
          data-testid="mybutton1"
          onClick={handleClick}
        >
          {loading ? "please wait" : "Click Me!!"}
        </button>
        <div
          data-testid="error message"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          This is an error !!!
        </div>
        <ul>
          <li>Apple</li>
          <li>Orange</li>
          <li>Banana</li>
        </ul>
        <h2 data-testid="mytestid">Hello From React</h2>
        <h2 title="mytitle">120</h2>
      </header>
    </div>
  );
}

export default App;
