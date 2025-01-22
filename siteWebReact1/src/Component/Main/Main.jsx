import './styles.css';

function Main() {
  return (
    <div className="App">
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
            <h1>Hello, I'm Anwer Kalghoum</h1>
            <p>Welcome to my portfolio website</p>
        </div>
    </header>

    <main>
        <section id="about">
            <h2>About Me</h2>
            <div class="about-container">
                <img src="http://hotprintdesign.com/wp-content/uploads/2019/02/no-profile-photo.jpg" alt="Your Picture" class="profile-picture" />
                <p>I am a [Your Profession] with a passion for [Your Interests].</p>
            </div>
        </section>

        <section id="experience">
            <h2>Experience</h2>
            <div class="experience-card">
                <img src="./assets/datadoit.jpg" alt="DataDoit" />
                <div>
                    <h3>DataDoIt</h3>
                    <p>Role: Software Developer</p>
                    <p>Description: Worked on developing innovative software solutions for small businesses.</p>
                </div>
            </div>
            <div class="experience-card">
                <img src="./assets/images.png" alt="DataDoit" />
                <div>
                    <h3>Samsung</h3>
                    <p>Role: Software Developer</p>
                    <p>Description: Worked on developing innovative software solutions for small businesses.</p>
                </div>
            </div>
        </section>

        <section id="projects">
            <h2>Projects</h2>
            <div class="project-card">
                <h3>Project 1</h3>
                <p>Brief description of the project.</p>
            </div>
            <div class="project-card">
                <h3>Project 2</h3>
                <p>Brief description of the project.</p>
            </div>
            <div class="project-card">
                <h3>Project 3</h3>
                <p>Brief description of the project.</p>
            </div>
        </section>

        <section id="skillssection">
            <h2>Skills</h2>
            <div class="skills-container">
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" />
                    <p>React</p>
                </div>
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" />
                    <p>Node.js</p>
                </div>
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="Angular Logo" />
                    <p>Angular</p>
                </div>
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript Logo" />
                    <p>JavaScript</p>
                </div>
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML Logo" />
                    <p>HTML</p>
                </div>
                <div class="skill">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS Logo" />
                    <p>CSS</p>
                </div>
            </div>
        </section>

        <section id="contact">
            <h2>Contact Me</h2>
            <p>Email: <a href="mailto:yourname@example.com">yourname@example.com</a></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 [Your Name]. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default Main;
