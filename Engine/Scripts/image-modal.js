function openModal(imgSrc) {
    const modal = document.getElementById('imagePreviewModal');
    const modalImg = document.getElementById('imgPreview');
    
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.addEventListener('keydown', handleKeyDown);
  }
  
  function closeModal() {
    const modal = document.getElementById('imagePreviewModal');
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleKeyDown);
  }
  
  const imgPreview = document.querySelectorAll('imgPreview');
  imgPreview.forEach((image) => {
    image.addEventListener('click', () => {
      const imgSrc = image.getAttribute('src');
      openModal(imgSrc);
    });
  });
  
  const modal = document.getElementById('imagePreviewModal');
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
  

  