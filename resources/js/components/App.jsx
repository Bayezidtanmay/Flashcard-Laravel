import { useState } from "react";
import NameColorManager from "./NameColorManager";
import Flashcards from "./Flashcards";
import "../../css/app.css";


function App() {
    const [view, setView] = useState("name-color");

    return (
        <div>
            <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
                <button onClick={() => setView("name-color")} className="name-color">Name-Color Manager</button>
                <button onClick={() => setView("flashcards")} className="switch">Switch to Flashcards</button>
            </nav>

            {view === "name-color" ? <NameColorManager /> : <Flashcards />}
        </div>
    );
}

export default App;

