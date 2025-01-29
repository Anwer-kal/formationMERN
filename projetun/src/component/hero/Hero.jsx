import '../main/styles.css';
function Hero(props) {
    return(
        <div>
            <div class="hero">
            <h1>Hello, I'm {props.name}</h1>
            <p>Welcome to my portfolio website</p>
        </div>
        </div>
    )
}
export default Hero;