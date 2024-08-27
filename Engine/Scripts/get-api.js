function openTrailerModal(src) {
    document.getElementById('trailerPreview').src = src;
    document.getElementById('trailerPreviewModal').style.display = 'flex';
}

function closeTrailerModal() {
    document.getElementById('trailerPreview').src = '';
    document.getElementById('trailerPreviewModal').style.display = 'none';
}

function openModal(imageUrl) {
    var modal = document.getElementById("screenshotPreviewModal");
    var img = document.getElementById("screenshotPreview");
    img.src = imageUrl;
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("screenshotPreviewModal");
    modal.style.display = "none";
}
