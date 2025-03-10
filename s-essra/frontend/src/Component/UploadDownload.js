import React, { useState } from 'react';
import { Button, Upload, message, notification, Modal, Input } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { uploadFile, downloadFile } from '../Api/api';

const UploadDownload = () => {
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [filename, setFilename] = useState("");
    const [previewVisible, setPreviewVisible] = useState(false);
    const [filePreview, setFilePreview] = useState(null);

    const handleFileChange = ({ file, fileList }) => {
        setFile(file);
        setFileList(fileList);
    };

    const handleUpload = async () => {
        if (!file) {
            notification.error({ message: 'Aucun fichier sélectionné.' });
            return;
        }

        try {
            await uploadFile(file);
            notification.success({ message: 'Fichier uploadé avec succès.' });
        } catch (error) {
            notification.error({ message: 'Erreur lors de l\'upload.' });
        }
    };

    const handleDownload = async () => {
        if (!filename) {
            notification.error({ message: 'Veuillez entrer le nom du fichier.' });
            return;
        }

        try {
            // Use the filename to download the file
            const response = await fetch(`http://localhost:8000/download?filename=${filename}`);
            const blob = await response.blob();

            // Check for errors from the server
            if (response.status !== 200) {
                throw new Error("Erreur lors du téléchargement.");
            }

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            notification.success({ message: 'Téléchargement réussi.' });

            // Set the file preview
            const previewUrl = URL.createObjectURL(blob);
            setFilePreview(previewUrl);  
            setPreviewVisible(true);    

        } catch (error) {
            notification.error({ message: 'Erreur lors du téléchargement.' });
        }
    };

    const handleCancelPreview = () => {
        setPreviewVisible(false); 
        setFilePreview(null);      
    };

    return (
        <div>
            <h2>Upload et Download de fichiers</h2>

            <Upload
                accept=".pdf,.jpeg,.png"
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
            >
                <Button icon={<UploadOutlined />}>Sélectionner un fichier</Button>
            </Upload>
            <Button type="primary" onClick={handleUpload} style={{ marginLeft: 10 }}>Upload</Button>
            <hr></hr>
            {/* Input field to enter filename for download */}
            <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)} // Update filename state
                placeholder="Entrez le nom du fichier"
                style={{ width: 200, marginLeft: 10 }}
            />

            <Button icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginLeft: 10 }}>
                Télécharger le fichier
            </Button>

            {/* Modal to preview the file */}
            <Modal
                visible={previewVisible}
                title="Aperçu du fichier"
                onCancel={handleCancelPreview}
                footer={null}
                width="80%"
                style={{ maxWidth: "100%" }}
            >
                {filePreview && (
                    <div>
                        {/* Display preview based on file type */}
                        {filename.endsWith('.pdf') ? (
                            <iframe
                                src={filePreview}
                                title="File Preview"
                                style={{ width: '100%', height: '500px' }}
                            />
                        ) : (
                            <img
                                src={filePreview}
                                alt="File Preview"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UploadDownload;
