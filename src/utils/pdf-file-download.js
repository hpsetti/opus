/**
 * @author SwathiDivya Bhavaraju
 * @email SwathiDivya.Bhavaraju@ul.com
 * @create date 2019-07-26 09:20:18
 * @modify date 2019-07-26 09:20:18
 */
import FileSaver from 'file-saver';
import { removeEncodedChar } from './common';

export function pdfFileDownload(pdfUrl) {
  return new Promise((resolve) => {
    if (pdfUrl) {
      const oReq = new XMLHttpRequest();
      // Configure XMLHttpRequest
      oReq.open('GET', pdfUrl, true);

      // Important to use the blob response type
      oReq.responseType = 'blob';

      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = () => {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        if (oReq.status === 200) {
          const file = new Blob([oReq.response], {
            type: 'application/pdf'
          });
          const fileName = removeEncodedChar(
            pdfUrl.split('?')[0].split('/').pop()
          );
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

export function regsNGuidPdfFileDownload(pdfUrl, token, fileName) {
  return new Promise((resolve) => {
    if (pdfUrl) {
      const oReq = new XMLHttpRequest();
      // Configure XMLHttpRequest
      oReq.open('GET', `${pdfUrl}?${token}`, true);

      // Important to use the blob response type
      oReq.responseType = 'blob';

      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = () => {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        if (oReq.status === 200) {
          let customFileName = fileName;
          const file = new Blob([oReq.response]);
          // //Generate file download directly in the browser !
          const fileext = fileName.split('.').pop();
          const urlext = pdfUrl.split('.').pop();
          if (urlext !== fileext) {
            customFileName = `${fileName}.${urlext}`;
          }
          FileSaver.saveAs(file, customFileName);
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
