import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/flashCard.css";

function Flashcards() {
    const [words, setWords] = useState([]);
    const [flipStates, setFlipStates] = useState({});

    const [finnish, setFinnish] = useState("");
    const [english, setEnglish] = useState("");
    const [example, setExample] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const response = await axios.get("/api/words");
            setWords(response.data);

            // Reset flip states for all cards
            const newFlipStates = {};
            response.data.forEach((word) => {
                newFlipStates[word.id] = false;
            });
            setFlipStates(newFlipStates);
        } catch (err) {
            console.error("Failed to fetch flashcards");
        }
    };

    const toggleFlip = (id) => {
        setFlipStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/words", { finnish, english, example });

            setFinnish("");
            setEnglish("");
            setExample("");
            setError("");

            await fetchWords(); // Refresh list
        } catch (err) {
            setError("Failed to add flashcard.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Add New Flashcard</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Finnish"
                    value={finnish}
                    onChange={(e) => setFinnish(e.target.value)}
                    required
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="English"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    required
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Example (optional)"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">Add</button>
            </form>

            <h1>Flashcards</h1>

            <div className="flashcard-grid">
                {words.map((word) => (
                    <div
                        key={word.id}
                        className="flashcard-container"
                        onClick={() => toggleFlip(word.id)}
                    >
                        <div className={`flashcard ${flipStates[word.id] ? "flipped" : ""}`}>
                            <div className="flashcard-content flashcard-front">
                                <p><strong>Finnish:</strong> {word.finnish}</p>
                                <p><strong>English:</strong> {word.english}</p>
                            </div>
                            <div className="flashcard-content flashcard-back">
                                <p><strong>Example:</strong> {word.example || "No example provided."}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Flashcards;


