import "./App.css";
import React, { useState, useEffect } from "react";
import DataDipslay from "./components/dataDisplay/DataDipslay";
import SearchBar from "./components/searchBar/SearchBar";
import Axios from "axios";

function App() {
  
  const [data, setData] = useState();
  // let d2 = []
  useEffect(() => {
    getCovidData();
  }, []);
  const getCovidData = async () => {
    const res = await Axios.get(
      `https://api.covid19india.org/state_district_wise.json`
    );
    
    setData(res.data);
  };
  const onInputChange = e => {
    // setSearch(e.target.value);
    console.log(e.target.value)
  };

  const onSearchClick = () => {
    getCovidData();
  };
  return (
    <div className="App">
      <div className="container">{data && <DataDipslay data={data} />}</div>
    </div>
  );
}

export default App;
