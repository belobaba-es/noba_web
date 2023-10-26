import { defineStore } from 'pinia'
import { OnboardingCompany } from '../types/onboardingCompany'

export const useOnboardingCompanyStore = defineStore('useOnboardingCompanyStore', {
  state: (): OnboardingCompany => ({
    email: '',
    informationCompany: {
      name: '',
      registerNumber: '',
      naics: '',
      naicsDescription: '',
      establishedDate: new Date(),
      webSite: '',
      phoneCountry: '',
      phoneNumber: '',
      registeredAddress: {
        streetOne: '',
        streetTwo: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
      physicalAddress: {
        streetOne: '',
        streetTwo: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
    },
    partners: [
      {
        firstName: '',
        middleName: '',
        lastName: '',
        otherLastName: '',
        email: '',
        dateBirth: new Date(),
        dni: '',
        taxId: '',
        passport: '',
        phoneCountry: '',
        phoneNumber: '',
        streetOne: '',
        streetTwo: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
      },
    ],
    accountQuestionnaire: {
      purposeAccount: '',
      sourceAssetsAndIncome: '',
      intendedUseAccount: '',
      anticipatedTypesAssets: '',
      anticipatedMonthlyCashVolume: '',
      anticipatedTradingPatterns: '',
      anticipatedMonthlyTransactionsIncoming: '',
      anticipatedMonthlyTransactionsOutgoing: '',
      natureBusinessCompany: '',
    },
  }),
})
