/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-02-10 16:17:32
 * @modify date 2020-02-10 16:17:32
 * @desc [description]
 */
import FileSaver from 'file-saver';

export default function fileDownload(url) {
  return new Promise((resolve) => {
    if (url) {
      const oReq = new XMLHttpRequest();
      // Configure XMLHttpRequest
      oReq.open('GET', url, true);

      // Important to use the blob response type
      oReq.responseType = 'blob';

      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = () => {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        if (oReq.status === 200) {
          const file = new Blob([oReq.response]);
          const fileName = unescape(url.split('?')[0].split('/').pop());
          // Generate file download directly in the browser !
          FileSaver.saveAs(file, fileName);
          resolve(null);
        } else {
          resolve({
            error: {
              errorMessage: 'Failed to Download the File'
            }
          });
        }
      };
      oReq.send();
    } else {
      resolve({
        error: {
          errorMessage: 'Failed to Download the File'
        }
      });
    }
  });
}
