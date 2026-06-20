import { useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const [prevImages, setPrevImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  const submitForm = () => {
    setLoading(true);
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
      setLoading(false);
    } else {
      const updatedInputs = { ...inputs };
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          updatedInputs[key] = defaultValues[key];
        }
      }
      setInputs(updatedInputs);
      makeQuery(updatedInputs);
    }
  };

  const makeQuery = (currentInputs) => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + currentInputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }

    setLoading(false);
  };


  return (
    <div className="whole-page">
      {loading && (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    )}
      <h1>SnapIO 📸</h1>

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>
      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div></div>
      )}
      <div className="container">
        <Gallery images={prevImages} />
        {/* <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p> */}
      </div>

      <br></br>
    </div>
  );
}

export default App;
