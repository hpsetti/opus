import { getSasToken } from '../../../apis/documents';

function filterStringForSpecialCharacters(str) {
  return str
    .replace(/%21/g, '!')
    .replace(/%27/g, "'")
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2A/g, '*')
    .replace(/%20/g, ' ');
}

export default {
  methods: {
    async downloadZipFile(downloadPath) {
      const pathArray = downloadPath.split('/').filter(Boolean);
      const containerName = filterStringForSpecialCharacters(pathArray[0]);
      const formData = {
        container_name: containerName,
        permissions: 'read',
        storage_name: 'opus-storage-java'
      };
      const token = await getSasToken(formData);
      const a = document.createElement('a');
      a.href = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${downloadPath}?${token.data}`;
      a.setAttribute('download', 'test.zip');
      a.click();
    }
  }
};
