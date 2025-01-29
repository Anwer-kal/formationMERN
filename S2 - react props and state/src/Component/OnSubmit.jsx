import React, { useState } from "react";

const FormComponent = () => {
    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        city: ""
    }); 
    const [message, setmessage] = useState('')
    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (event) => {
        const { name,surname,city, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            [surname]:value,
            [city]:value
        }));
    }; 
    
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form submitted: Name: ${formData.name}  surame: ${formData.surname} surname  city: ${formData.city}`);
        setmessage(<p>Form submitted: Name: {formData.name}  surame: {formData.surname} surname  city: {formData.city}</p>)
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
                    <label htmlFor="surname">surname:</label>
                    {" "}
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange} // Met à jour le champ 'name'
                    />
                    {" "}
                    <label htmlFor="city">city:</label>
                    {" "}
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange} // Met à jour le champ 'name'
                    />
                </div>
                <button type="submit">Submit</button>{" "}
            </form>
            {" "}
            <p>{message}</p>
        </div>
    );
};
export default FormComponent;
