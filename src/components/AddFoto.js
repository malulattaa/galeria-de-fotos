import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFoto = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async () => {
    let imageBase64;

    try {
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          imageBase64 = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
          uploadImage(imageBase64);
        };
      } else if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          imageBase64 = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
          uploadImage(imageBase64);
        };
      }
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
      alert("Ocorreu um erro ao carregar a imagem. Verifique a URL e tente novamente.");
    }
  };

  const uploadImage = async (base64Image) => {
    try {
      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAJ53LDwoEUu5kMGl1QE6reGulcb9AbKGk',
        {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'LABEL_DETECTION', maxResults: 1 }],
            },
          ],
        }
      );

      const caption = response.data.responses[0].labelAnnotations[0].description;
      const photo = { url: imageUrl || URL.createObjectURL(selectedFile), date, caption };
      const gallery = JSON.parse(localStorage.getItem('gallery')) || [];
      gallery.push(photo);
      localStorage.setItem('gallery', JSON.stringify(gallery));

      navigate('/gallery');
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Ocorreu um erro ao enviar a imagem para a API. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="add-photo-container">
      <h1>Adicionar Foto</h1>
      <input type="text" placeholder="URL da imagem" onChange={handleImageUrlChange} />
      <input type="file" onChange={handleFileChange} />
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={handleSubmit}>Adicionar Foto</button>
      <button onClick={() => navigate('/gallery')}>Ver Galeria</button>
    </div>
  );
};

export default AddFoto;

