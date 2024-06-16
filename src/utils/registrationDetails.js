/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2019-08-07 09:21:03
 * @modify date 2019-08-07 09:21:03
 * @desc common helper functions page
 */
import dayjs  from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


export default function validateRegDetailsData(selectedRegistration) {
  let activeRegistration = {};
  let inProgressVal = '';
  let expiration = '';
  let expirationDate = '';
  let approvalDate = '';
  let submissionDate = '';
  let salesForceManage = '';
  let countryCode = '';
  let countryName = '';

  if (
    selectedRegistration.renewal_in_progress ||
    selectedRegistration.modification_in_progress
  ) {
    inProgressVal = 'In Progress';
  } else {
    inProgressVal = '';
  }

  if (selectedRegistration.status.toLowerCase() === 'pending') {
    expiration = 'N/A';
  } else if (selectedRegistration.doesNotExpireStatus) {
    expiration = 'No expiration';
  } else {
    expiration = dayjs.utc(selectedRegistration.expiration_date).fromNow();
  }
  if (selectedRegistration.expiration_date) {
    expirationDate = dayjs
      .utc(selectedRegistration.expiration_date)
      .format('DD MMM YYYY');
  } else {
    expirationDate = 'N/A';
  }

  if (selectedRegistration.approval_date) {
    approvalDate = dayjs
      .utc(selectedRegistration.approval_date)
      .format('DD MMM YYYY');
  } else {
    approvalDate = 'N/A';
  }
  if (selectedRegistration.submission_date) {
    submissionDate = dayjs
      .utc(selectedRegistration.submission_date)
      .format('DD MMM YYYY');
  } else {
    submissionDate = 'N/A';
  }
  if (selectedRegistration.salesforce_id) {
    salesForceManage = selectedRegistration.salesforce_id;
  } else {
    salesForceManage = 'no';
  }
  if (
    !selectedRegistration.country_name &&
    !selectedRegistration.country_code
  ) {
    countryCode = 'Not Available';
    countryName = 'Not Available';
  } else {
    countryCode = selectedRegistration.country_code;
    countryName = selectedRegistration.country_name;
  }
  activeRegistration = {
    id: selectedRegistration.registration_number,
    registrationId: selectedRegistration.registration_id,
    Product: selectedRegistration.product_name,
    'Part number': selectedRegistration.part_number,
    'Record number': selectedRegistration.registration_number,
    Status:
      selectedRegistration.status.charAt(0).toUpperCase() +
      selectedRegistration.status.slice(1),
    Expiration: expiration,
    Country: countryName,
    'Device UDI': selectedRegistration.udi,
    'Local distributor': selectedRegistration.distributor_name || '',
    'Device class': selectedRegistration.product_class || '',
    Comments: selectedRegistration.comments,
    'Device family': selectedRegistration.product_family || '',
    'Device type': selectedRegistration.product_type || '',
    'Country Code': countryCode,
    'Expiration Date': expirationDate,
    'Approval Date': approvalDate,
    'Submission Date': submissionDate,
    rawExpirationDate: selectedRegistration.expiration_date,
    rawApprovalDate: selectedRegistration.approval_date,
    rawSubmissionDate: selectedRegistration.submission_date,
    notYetApprovedStatus: selectedRegistration.notYetApprovedStatus,
    doesNotExpireStatus: selectedRegistration.doesNotExpireStatus,
    'Local representative': selectedRegistration.local_representative || '',
    medCompContact: selectedRegistration.medcomp_contact_id
      ? selectedRegistration.medcomp_contact_name
      : '',
    attachmentLinks: selectedRegistration.attachmentLinks
      ? selectedRegistration.attachmentLinks.split(';')
      : '',
    countryId: selectedRegistration.country_id,
    product_class_id: selectedRegistration.product_class_id,
    statusDescription: selectedRegistration.statusDescription,
    Manufacturer: selectedRegistration.registrationCompany,
    'Device hardware version': selectedRegistration.deviceHardwareVersion,
    'Device software version': selectedRegistration.deviceSoftwareVersion,
    alertBeforeMonths: selectedRegistration.alertBeforeMonths,
    Configuration: selectedRegistration.configuration,
    relatedCertificateName: selectedRegistration.related_certificate,
    relatedCertificateId: selectedRegistration.relatedCertificateId,
    registrationType: selectedRegistration.registrationType,
    registrationMinimumRenewalDate:
      selectedRegistration.registrationMinimumRenewalDate,
    registrationRenewalDeadline:
      selectedRegistration.registrationRenewalDeadline,
    'Submission number': selectedRegistration.submission_number,
    submissionNumber: selectedRegistration.submission_number,
    archiveReasonID: selectedRegistration.archiving_reason_id,
    archiveReasonName: selectedRegistration.archivingReasonName,
    archivingReasonName: selectedRegistration.archivingReasonName
      ? selectedRegistration.archivingReasonName
      : '',
    renewal_in_progress: selectedRegistration.renewal_in_progress,
    modification_in_progress: selectedRegistration.modification_in_progress,
    'Issued by':
      selectedRegistration.issued_by == null
        ? ''
        : selectedRegistration.issued_by,
    'Record type': selectedRegistration.record_type,
    relatedProduct: selectedRegistration.relatedProductName,
    'In Progress': inProgressVal,
    salesForceManaged: salesForceManage,
    is_archived: selectedRegistration.is_archived,
    is_deleted: selectedRegistration.is_deleted
  };

  return activeRegistration;
}
