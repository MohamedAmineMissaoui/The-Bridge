import "./Course.css";

export default function Course({ image, title, price }) {
  return (
    <div id="course-content" key={title}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} DT/ Month</p>
    </div>
  );
}
