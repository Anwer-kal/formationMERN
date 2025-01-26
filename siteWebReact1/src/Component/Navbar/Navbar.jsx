import '../styles.css';
function Nav(props) {
  return (
    <>
    {console.log(props)}
    <header>
        <nav>
            <ul>
                 {props.item.map(
                    (e, index)=>{
                        console.log(e)
                        return <li key={e.id}><a href="#about">{e.title}</a></li>
                    }
                 )}
            
     
            </ul>
        </nav>

    </header>
</>
  );
}

export default Nav;
