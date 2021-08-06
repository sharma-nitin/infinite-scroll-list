
import React, { useState, useEffect } from "react";
import ListItem from "./Listitem";
import './List.css'

function List() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);

  useEffect(() => {
    fetchData();
  }, [start]);

  const fetchData = () => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
      .then((data) => data.json())
      .then((res) => {
        setData((data) => [...data, ...res]);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  };

  const handleScroll = (e) => {
    const bottom =  (e.target.scrollHeight - Math.ceil(e.target.scrollTop)) === e.target.clientHeight;
    if (bottom) { 
      setStart(start+10)
     }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <b>List Items</b>
        </div>
      </header>
      <div id="container" className="container" onScroll={handleScroll}>
        <>
          {error ? (
            <ErrorMessage />
          ) : (
            <>
              {
                <>
                  {data.length ? (
                    <>
                      <ListItem data={data} />
                    </>
                  ) : null}
                </>
              }
              {isLoading && (
                  <div className="loading">
                    Loading New data ...
                  </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

const ErrorMessage = () => (
    <div className="error">Error fetching data</div>
);

export default List;
