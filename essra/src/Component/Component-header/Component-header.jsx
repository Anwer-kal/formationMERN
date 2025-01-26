import '././Component-header.css';

const Header = () => {
    return (
      <header>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div class="hero">
          <h1>Hello, I'm Essra Jegham</h1>
          <p>Welcome to my portfolio website</p>
        </div>
      </header>
    );
}

export default Header;
