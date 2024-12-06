// Helper function to convert base64 data URL to Blob
//  - Example base64 data URL : "data:image/png;base64,iVBO..."
export function dataURLToBlob(dataURL: string) {
  // Extract the MIME type (e.g., image/png, application/pdf)
  const mimeType = dataURL.split(';')[0].split(':')[1];

  // Decode the base64 string into binary data
  const byteString = atob(dataURL.split(',')[1]);

  // Convert the byte string to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Populate the ArrayBuffer with the binary data
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Return the Blob with the appropriate MIME type
  return new Blob([uint8Array], { type: mimeType });
}
