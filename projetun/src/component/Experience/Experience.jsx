import '../main/styles.css';
function Experience() {
    return ( <div>
         <section id="experience">
            <h2>Experience</h2>
            <div class="experience-card">
                <img src="./assets/datadoit.jpg" alt="DataDoit"/>
                <div>
                    <h3>DataDoIt</h3>
                    <p>Role: Software Developer</p>
                    <p>Description: Worked on developing innovative software solutions for small businesses.</p>
                </div>
            </div>
            <div class="experience-card">
                <img src="./assets/images.png" alt="Samsung"/>
                <div>
                    <h3>Samsung</h3>
                    <p>Role: Software Developer</p>
                    <p>Description: Worked on developing innovative software solutions for small businesses.</p>
                </div>
            </div>
            <div class=" experience-card">
                <img src="./assets/TechSphere_Solution.jpg" alt="TechSphere Solutions" class="techSol"/>
                <div>
                    <h3>TechSphere Solutions</h3>
                    <p> Role :Software Developer</p>
                    <p>Description: Developed custom CRM software for mid-sized enterprises, 
                        integrating advanced analytics tools to enhance customer insights. </p>
            </div>
            </div>
        </section>

    </div> );
}

export default Experience;