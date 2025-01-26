import React, { useState } from "react";

const FormComponent = () => {
    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        name: "",
        surName: "",
        city: ''
    });

    const [message, setMessage] = useState('');

    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (event) => {
        const { name, surName, city, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            [surName]: value,
            [city]: value
        }));
    };

    // Fonction pour gérer la soumission du formulaire 
    const handleSubmit = (event) => {
        event.preventDefault();
        // BACKEND
        setMessage(`Form submitted: Name: ${formData.name},   SurName: ${formData.surName} ,   City: ${formData.city}`)
        alert(`Form submitted: Name: ${formData.name},   SurName: ${formData.surName} ,   City: ${formData.city}`);
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
                    <br />
                    <label htmlFor="surName">SurName:</label>

                    <input
                        type="text"
                        id="surName"
                        name="surName"
                        value={formData.surName}
                        onChange={handleChange} // Met à jour le champ 'name'
                    />
                    <br></br>
                    <label htmlFor="city">City:</label>

                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange} // Met à jour le champ 'name'
                    />
                    {" "}
                </div>
                <button type="submit">Submit</button>{" "}
            </form>
            <p>{message}</p>
            {" "}
        </div>
    );
};
export default FormComponent;
