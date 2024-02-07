import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDocuments = () => {
  const { t } = useI18n({ useScope: 'global' })

  const documentTypeProofOfAddress = ref([
    { value: 'monthly_utility', name: t('documentProofOfAddress1') },
    { value: 'statements', name: t('documentProofOfAddress2') },
    { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
    { value: 'vehicle_registration', name: t('documentProofOfAddress4') },
    { value: 'real_estate_property_title', name: t('documentProofOfAddress5') },
    { value: 'property_tax_bill', name: t('documentProofOfAddress6') },
    { value: 'w2', name: t('documentProofOfAddress7') },
  ])

  const documentTypeOptions = ref([
    { value: 'passport', name: t('docTypeLabelPassport') },
    { value: 'dni', name: 'Dni' },
    { value: 'drivers_license', name: t('docTypeLabelDriversLicense') },
    { value: 'government_id', name: t('docTypeLabelGovernmentId') },
    { value: 'residence_permit', name: 'Residence Permit' },
  ])

  return {
    documentTypeProofOfAddress,
    documentTypeOptions,
  }
}
