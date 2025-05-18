import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/app.css";

function NameColorManager() {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchNameColors();
    }, []);

    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`/api/name-colors/${editId}`, { name, color });
                setEditId(null);
            } else {
                await axios.post("/api/name-colors", { name, color });
            }

            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError(editId ? "Failed to update entry" : "Failed to add entry");
        }
    };

    const handleEdit = (id, name, color) => {
        setEditId(id);
        setName(name);
        setColor(color);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
        } catch (err) {
            setError("Failed to delete entry");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Name and Color Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">{editId ? "Update" : "Add"}</button>
            </form>
            <ul>
                {nameColors.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.color}
                        <button onClick={() => handleEdit(item.id, item.name, item.color)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NameColorManager;
