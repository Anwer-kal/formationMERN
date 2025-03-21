import '../styles.css';
function Hero(props) {
  return (

<header>

        <div className="hero">
            <h1>Hello, I'm {props.name}</h1>
            <p>{props.description}</p>
        </div>
    </header>

  );
}

export default Hero;
