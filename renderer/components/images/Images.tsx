import React from "react";
import { createClient } from "pexels";

const client = createClient(
  "P5KWjNGguw0dVx6E224ta7jeJIyKlifYPm9wkavVC6xDA2q93EA1Xfir"
);
const query = "Nature";

var photos = [];

function click() {
  const prompt = document.querySelector(".query").innerHTML;
  client.photos.search({ query: prompt, per_page: 80 }).then((photos) => {
    console.log(photos);
  });
}

const Images = () => {
  return (
    <div>
      <input type="test" placeholder="Name of the images" className="query" />
      <button onClick={click}>Search</button>
    </div>
  );
};

export default Images;
