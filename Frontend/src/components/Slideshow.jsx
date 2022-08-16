import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "../styles/Slideshow.css";
import { useNavigate } from "react-router-dom";

const slideImages = [
  {
    url: "https://picsum.photos/id/1026/675/650",
  },
  {
    url: "https://picsum.photos/id/23/675/650",
  },
  {
    url: "https://picsum.photos/id/1/675/650",
  },
];

export const Slideshow = () => {
  const navigate = useNavigate();

  return (
    <div className="slide-container">
      <SimpleImageSlider
        width={700}
        height={604}
        images={slideImages}
        showBullets
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={3}
        slideDuration={1.2}
        style={{ marginTop: "50px" }}
      />
      <div>
        <h1>Our best selling items</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
          numquam, placeat veniam laboriosam, ipsam fugiat iste quae tenetur
          recusandae minima amet tempore sunt eum qui est? Esse alias aut quasi
          dolor accusantium voluptatum molestiae vero?
        </p>
        <button
          onClick={() => {
            navigate("/store");
          }}
        >
          Shop Now !
        </button>
      </div>
    </div>
  );
};
