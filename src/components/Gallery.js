import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGallery = JSON.parse(localStorage.getItem('gallery')) || [];
    setGallery(storedGallery);
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleDateChange = (index, newDate) => {
    const updatedGallery = [...gallery];
    updatedGallery[index].date = newDate;
    setGallery(updatedGallery);
    localStorage.setItem('gallery', JSON.stringify(updatedGallery));
  };

  const handleDeletePhoto = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    localStorage.setItem('gallery', JSON.stringify(updatedGallery));
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Galeria de Fotos</h1>
      </div>
      <div className="gallery">
        {gallery.map((photo, index) => (
          <div key={index} className="photo-container">
            <img src={photo.url} alt={photo.caption} onClick={() => handlePhotoClick(photo)} />
            <div className="caption" onClick={() => handlePhotoClick(photo)}>
              {photo.caption}
            </div>
            <input
              type="date"
              value={photo.date}
              onChange={(e) => handleDateChange(index, e.target.value)}
            />
            <button onClick={() => handleDeletePhoto(index)}>Excluir Foto</button>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <img src={selectedPhoto.url} alt={selectedPhoto.caption} />
            <caption>{selectedPhoto.caption}</caption>
            <button onClick={() => setSelectedPhoto(null)}>Fechar</button>
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => navigate('/')}>Adicionar Nova Foto</button>
      </div>
    </div>
  );
};

export default Gallery;



