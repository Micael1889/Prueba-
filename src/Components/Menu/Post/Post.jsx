import { Carousel } from "react-bootstrap";
import "./Post.css";

const Post = ({ avisos }) => {
  return (
    <Carousel fade interval={3000} className="carousel-ml-style w-75">
      {avisos.map((aviso, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-image-wrapper">
            <img
              className="d-block w-100 carousel-image"
              src={aviso.imagen}
              alt={aviso.imagen}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Post;
