const imageInput = document.getElementById('image-input');
const detectButton = document.getElementById('detect-button');
const imagePreview = document.getElementById('image-preview');
const resultsContainer = document.getElementById('results');

detectButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('/detect', {
    method: 'POST',
    body: formData})
  .then(response => response.json())
  .then(data => {
    resultsContainer.innerHTML = '';
    const resultsList = document.createElement('ul');
    data.detections.forEach(detection => {
      const listItem = document.createElement('li');
      listItem.textContent = `${detection.class} - Confidence: ${detection.confidence.toFixed(2)}`;
      resultsList.appendChild(listItem);
    });
    resultsContainer.appendChild(resultsList);

    // Display image with detected objects
    imagePreview.src = `data:image/jpeg;base64,${data.image}`;
  })
  .catch(error => console.error('Error:', error));
});