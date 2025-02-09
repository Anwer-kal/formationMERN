import React, { useState } from 'react';
import { Button, Modal } from 'antd';
function Contact(){
    const [formData , setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:"",
      });
      const handleChange=(e)=>{
        const{name, value}=e.target;
        setFormData({...formData,[name]:value});
      };
      const handleSubmit=(e)=>{
        e.prevenDefaut();}
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Contact me !
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div>
      <h2  >besion d'aide ?</h2>
        <form onSubmit={handleSubmit}  >
          <p><label htmlFor="">Nom :
          <input 
          type="text" 
          name="name " 
          placeholder="nom" 
          value={formData.name} 
          onChange={handleChange} 
          required  
          />
          </label></p>
         <br />
         <p>
         <label htmlFor="">Email:
         <input type="email"
          name="email "
           placeholder="email" 
           value={formData.email} 
           onChange={handleChange} 
           required
           className="email1"
          />
         </label></p>
         <br />
         <p>
         <label htmlFor="">Message :
          <textarea  
          name="message " 
          placeholder="messagr" 
          value={formData.message} 
          onChange={handleChange} 
          required 
          />
          </label></p>
          </form>
          </div>
      </Modal>
    </>
  );
};
export default Contact;