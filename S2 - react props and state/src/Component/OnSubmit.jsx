import React, { useState } from "react";

const FormComponent = () => {
    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        name: "",
    }); 
    
    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }; 
    
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form submitted: Name: ${formData.name} `);
    };

    return (
        <div>
            <h1>Contact Form</h1>{" "}
            <form onSubmit={handleSubmit}>
                {" "}
                <div>
                    <label htmlFor="name">Name:</label>
                    {" "}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} // Met à jour le champ 'name'
                    />
                    {" "}
                </div>
                <button type="submit">Submit</button>{" "}
            </form>
            {" "}
        </div>
    );
};
export default FormComponent;
