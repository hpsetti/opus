export default async function upload(file, folderName, sasToken, containerName, removeSpecialCharacters = true, azureURL = import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL) {
  let result;
  try {
    const url = folderName ? `${azureURL}/${containerName}/${folderName}?${sasToken}` : `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}/${containerName}?${sasToken}`;
    const containerURL = new azblob.ContainerURL(url,
      azblob.StorageURL.newPipeline(new azblob.AnonymousCredential()));
    let fileName = file.name;
    if (removeSpecialCharacters) fileName = fileName.replace(/[^A-Z0-9.]/ig, '');
    const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(
      containerURL,
      fileName,
    );

    result = await azblob.uploadBrowserDataToBlockBlob(
      azblob.Aborter.none,
      file,
      blockBlobURL,
    );
    if (
      result
      && result._response.status === 201 // eslint-disable-line no-underscore-dangle
      && result._response.request.url // eslint-disable-line no-underscore-dangle
    ) {
      const responseUrl = result._response.request.url;// eslint-disable-line no-underscore-dangle
      const filePath = responseUrl.split('?')[0];
      return filePath;
    } return 0;
  } catch (error) {
    console.log('azure file upload error', error);
  }
  return 0;
}
