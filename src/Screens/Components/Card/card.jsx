import "./card.scss";

function Card(props) {
  return <div className={`MyCard ${props.className}`}>{props.children}</div>;
}
export default Card;
