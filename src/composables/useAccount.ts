import { useRouter, useRoute } from 'vue-router'
import { useAccountStore } from '../stores/account'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ProfileService } from '../views/profile/services/profile'
import { useUserStore } from '../stores/user'
import { Member, Owner } from '../views/profile/types/account.interface'
import { useToast } from 'primevue/usetoast'

export const useAccount = () => {
  const router = useRouter()
  const route = useRoute()
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  const account = storeToRefs(accountStore)
  const { t } = useI18n({
    useScope: 'global',
  })
  const toast = useToast();
  const submitting = ref(false);

  const currentPassword = ref<string>('');
  const newPassword = ref<string>('');
  const confirmNewPassword = ref<string>('');

  const phoneNumberWithCountry = computed(() => {
    return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
  })

  const isNaturalAccount = computed<boolean>(() => account.natureAccount.value === 'natural_person')

  const fullName = computed(() => {
    const naturalAccount = `${account.owner.value?.firstName} ${account.owner.value?.middleName} ${account.owner.value?.lastName}`
    const companyAccount = account.owner.value?.name
    return isNaturalAccount.value ? naturalAccount : companyAccount
  })

  const labelNameProfile = computed(() => {
    return isNaturalAccount.value ? t('fullName') : t('businessNameLabel')
  })

  const formTitle = computed(() => (isNaturalAccount.value ? t('partnerTitle') : t('companyData')))

  const submitProfileForm = () => {
    submitting.value = true
    const profileService = ProfileService.instance()
    profileService.updateContact(account.accountId.value!, userStore.getUser.contactId, accountStore.form).then(() => {
      submitting.value = false;
      toast.add({
        severity: 'info',
        summary: t('successfulOperation'),
        detail: t('shareholderDataSuccessSend'),
        life: 3000,
      });
    })
    .catch(error => {
      submitting.value = false;
      toast.add({
        severity: 'error',
        summary: t('somethingWentWrong'),
        detail: error.response.data.message,
        life: 4000,
      })
      
    })
  }

  const getFullName = (payload: Owner | Member) => {
    return `${payload.firstName} ${payload.middleName} ${payload.lastName}`
  }

  const setDocumentResponseId = (documentResponseId: string | null) => {
    if (!documentResponseId) return
    accountStore.setDocumentResponseId(documentResponseId)
  }

  const editProfile = (): void => {
    router.push(`/profile/${route.params.accountId}/edit`)
  }

  const fetchAccount = async () => {
    await accountStore.getAccountByID(route.params.accountId)
  }

  const submitUpdatePassword = async () => {
    submitting.value = true
    const profileService = ProfileService.instance()
    profileService
      .updatePassword(userStore.getUser.email, newPassword.value, currentPassword.value)
      .then(() => {
        submitting.value = false;
        clearUpdatePasswordForm();
        toast.add({
          severity: 'info',
          summary: t('successfulOperation'),
          detail: t('updatePasswordSuccessMessage'),
          life: 3000,
        });
      })
      .catch(error => {
        submitting.value = false
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: error.response.data.message,
          life: 4000,
        })
      })
  }

  const clearUpdatePasswordForm = () => {
    newPassword.value = '';
    confirmNewPassword.value = '';
    currentPassword.value = '';
  }

  return {
    fetchAccount,
    editProfile,
    submitProfileForm,
    getFullName,
    setDocumentResponseId,
    submitUpdatePassword,
    ...account,
    fullName,
    phoneNumberWithCountry,
    formTitle,
    isNaturalAccount,
    submitting,
    labelNameProfile,
    newPassword,
    currentPassword,
    confirmNewPassword
  }
}
