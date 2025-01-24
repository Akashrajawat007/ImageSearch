import React, { useRef, useState } from "react";
import "./index.css";
import { Form } from "react-bootstrap";
import axios from "axios";

const App = () => {
  const searchInput = useRef("");
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 20;

  const fetchImages = async () => {
    try {
      const text = searchInput.current.value;
      if (text.length > 0) {
        const { data } = await axios.get(
          `${API_URL}?query=${text}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        console.log("Data: ", data);
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("birds")}>Birds</div>
        <div onClick={() => handleSelection("cats")}>Cats</div>
        <div onClick={() => handleSelection("dogs")}>Dogs</div>
      </div>
      <div className="images">
        {images.map((image) => {
          return (
            <img key={image.id} src={image.urls.small} alt={image.alt_description} className="image"/>
          )
        })}
      </div>
    </div>
  );
};

export default App;
