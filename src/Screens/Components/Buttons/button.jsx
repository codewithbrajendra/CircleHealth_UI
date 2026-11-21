const Button = (props) => {
  return (
    <button {...props}>
      <span>{props.text}</span> {props.children}
    </button>
  );
};

export default Button;
