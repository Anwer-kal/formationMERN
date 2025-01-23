import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ModalExample = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fonction pour ouvrir le Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Fonction pour fermer le Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Bouton pour afficher le Modal */}
      <Button type="primary" onClick={showModal}>
        Ouvrir le popup
      </Button>

      {/* Modal qui s'affiche lorsque isModalVisible est true */}
      <Modal
        title="Titre du Popup"
        visible={isModalVisible}
        onOk={handleCancel} // Ferme le modal lorsque l'utilisateur clique sur "OK"
        onCancel={handleCancel} // Ferme le modal lorsque l'utilisateur clique sur "Annuler"
      >
        <p>Contenu du popup...</p>
      </Modal>
    </div>
  );
};

export default ModalExample;
