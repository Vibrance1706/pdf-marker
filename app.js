// PDF.js initialization
const url = 'test.pdf'; // Path to your PDF file

let pdfDoc = null;
const pdfContainer = document.getElementById('pdfContainer');
const pdfPagesContainer = document.getElementById('pdfPagesContainer'); // To hold all canvas elements
const marker = document.getElementById('marker');

// Function to render each page of the PDF
function renderPage(page, pageNumber) {
  const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: ctx,
    viewport: viewport
  };
  
  // Render the page onto the canvas
  page.render(renderContext).promise.then(function() {
    console.log(`Page ${pageNumber} rendered`);
  }).catch(function(error) {
    console.error(`Error rendering page ${pageNumber}:`, error);
  });

  // Append the canvas to the container
  pdfPagesContainer.appendChild(canvas);
}

// Load and render all PDF pages
function renderAllPages() {
  for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
    pdfDoc.getPage(pageNumber).then(function(page) {
      renderPage(page, pageNumber);
    });
  }
}

// Scroll event listener to update marker position
function onScroll() {
  const scrollTop = pdfContainer.scrollTop;
  marker.style.top = `${100 - scrollTop}px`; // Adjust marker's vertical position based on scroll
}

// Load the PDF document
pdfjsLib.getDocument(url).promise.then(function(pdf) {
  pdfDoc = pdf;
  console.log("PDF loaded");
  renderAllPages(); // Render all the pages

  pdfContainer.addEventListener('scroll', onScroll); // Listen to scroll events
}).catch(function(error) {
  console.error("Error loading PDF:", error);
});
