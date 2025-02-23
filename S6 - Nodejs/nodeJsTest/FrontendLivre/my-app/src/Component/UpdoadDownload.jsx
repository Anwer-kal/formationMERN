import React, { useState } from 'react';
import { Button, Upload, notification, Modal, Input, Carousel } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { uploadFile } from '../Api/api';

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
            const response = await fetch(`http://localhost:8000/download?filename=${filename}`);
            const blob = await response.blob();

            if (response.status !== 200) {
                throw new Error("Erreur lors du téléchargement.");
            }

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            notification.success({ message: 'Téléchargement réussi.' });

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
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px', backgroundColor: '#f4f7fa', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333', fontSize: '26px', marginBottom: '25px', fontWeight: 500 }}>
                Upload et Download de fichiers
            </h2>

            {/* Carrousel d'images */}
            <Carousel autoplay style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
                <div>
                    <img src="http://localhost:8000/uploads/img1.jpg" alt="img1" style={{ width: '80%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="http://localhost:8000/uploads/img2.jpg" alt="img2" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="http://localhost:8000/uploads/img3.jpg" alt="img3" style={{ width: '50%', height: '400px', objectFit: 'cover' ,marginRight:'100px'}} />
                </div>
            </Carousel>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <Upload accept=".pdf,.jpeg,.png" fileList={fileList} onChange={handleFileChange} beforeUpload={() => false} style={{ width: '60%' }}>
                    <Button icon={<UploadOutlined />} style={{ padding: '12px 18px', fontSize: '18px', backgroundColor: '#1890ff', color: '#fff', borderRadius: '6px' }}>
                        Sélectionner un fichier
                    </Button>
                </Upload>
                <Button type="primary" onClick={handleUpload} style={{ padding: '12px 18px', fontSize: '18px', backgroundColor: '#52c41a', color: '#fff', borderRadius: '6px' }}>
                    Upload
                </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <Input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="Entrez le nom du fichier" style={{ width: '70%', padding: '10px 12px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <Button icon={<DownloadOutlined />} onClick={handleDownload} style={{ padding: '12px 18px', fontSize: '18px', backgroundColor: '#ff4d4f', color: '#fff', borderRadius: '6px' }}>
                    Télécharger
                </Button>
            </div>

            <Modal visible={previewVisible} title="Aperçu du fichier" onCancel={handleCancelPreview} footer={null} width="80%" style={{ borderRadius: '12px' }}>
                {filePreview && (
                    <div>
                        {filename.endsWith('.pdf') ? (
                            <iframe src={filePreview} title="File Preview" style={{ width: '100%', height: '500px', borderRadius: '8px' }} />
                        ) : (
                            <img src={filePreview} alt="File Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UploadDownload;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  {/*}
import React, { useState } from 'react';
import { Button, Upload, notification, Modal, Input } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { uploadFile, downloadFile } from '../Api/api';

const UploadDownload = () => {
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [filename, setFilename] = useState(""); // Add state for filename
    const [previewVisible, setPreviewVisible] = useState(false);
    const [filePreview, setFilePreview] = useState(null); // Store file preview URL

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
            setFilePreview(previewUrl);  // Store the preview URL
            setPreviewVisible(true);     // Show the modal

        } catch (error) {
            notification.error({ message: 'Erreur lors du téléchargement.' });
        }
    };

    const handleCancelPreview = () => {
        setPreviewVisible(false);  // Hide the modal
        setFilePreview(null);      // Clear the preview URL
    };

    // Define inline styles with a soft, modern design
    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        backgroundColor: '#f4f7fa',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
    };

    const titleStyle = {
        textAlign: 'center',
        color: '#333',
        fontSize: '26px',
        marginBottom: '25px',
        fontWeight: 500,
    };

    const sectionStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
    };

    const buttonStyle = {
        padding: '12px 18px',
        fontSize: '18px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const inputStyle = {
        width: '70%',
        marginLeft: '15px',
        padding: '10px 12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    };

    const inputFocusStyle = {
        ...inputStyle,
        borderColor: '#1890ff',  // Highlight input border on focus
    };

    const modalContentStyle = {
        maxWidth: '100%',
        maxHeight: '500px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Upload et Download de fichiers</h2>

            <div style={sectionStyle}>
                <Upload
                    accept=".pdf,.jpeg,.png"
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    style={{ width: '60%' }}
                >
                    <Button icon={<UploadOutlined />} style={{ ...buttonStyle, backgroundColor: '#1890ff', color: '#fff' }}>
                        Sélectionner un fichier
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    style={{ ...buttonStyle, backgroundColor: '#52c41a', color: '#fff', width: '30%' }}
                >
                    Upload
                </Button>
            </div>

            <div style={sectionStyle}>
                <Input
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)} // Update filename state
                    placeholder="Entrez le nom du fichier"
                    style={filename ? inputFocusStyle : inputStyle}  // Highlight on focus
                />
                <Button
                    icon={<DownloadOutlined />}
                    onClick={handleDownload}
                    style={{ ...buttonStyle, backgroundColor: '#ff4d4f', color: '#fff', width: '30%' }}
                >
                    Télécharger le fichier
                </Button>
            </div>

            {/* Modal to preview the file 
            <Modal
                visible={previewVisible}
                title="Aperçu du fichier"
                onCancel={handleCancelPreview}
                footer={null}
                width="80%"
                style={{ borderRadius: '12px' }}
            >
                {filePreview && (
                    <div style={modalContentStyle}>
                        {/* Display preview based on file type 
                        {filename.endsWith('.pdf') ? (
                            <iframe
                                src={filePreview}
                                title="File Preview"
                                style={{ width: '100%', height: '500px', borderRadius: '8px' }}
                            />
                        ) : (
                            <img
                                src={filePreview}
                                alt="File Preview"
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UploadDownload;*/}





