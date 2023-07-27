import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if(selectedCategory) {
          url += `?category=${selectedCategory}`
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data. please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Book</h1>
      <p>
        Lorem Epsum this is default wording that im putting to the site to make
        it seem like a medium sized average looking paragraph
      </p>

      <h2>Fetch Example</h2>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

      {/* Select Menu */}
      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="crime">Crime</option>
          <option value="fiction">Fiction</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="food">Food</option>
          <option value="other">Other...</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Book;
