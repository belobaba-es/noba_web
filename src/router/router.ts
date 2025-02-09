import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProfileIndex from '../views/profile/Index.vue'
import Deposit from '../views/deposit/Deposit.vue'
import Login from '../views/login/Index.vue'
import SwapIndexVue from '../views/swap/Index.vue'
import SwapSuccess from '../views/swap/Success.vue'

import WalletIndex from '../views/wallet/Wallet.vue'
import TransactionHistoryWallet from '../views/wallet/Transaction.vue'

import TransactionHistory from '../views/transaction-history/Index.vue'

import UploadDocumentsIndex from '../views/onboarding/index.vue'

import { useAuth } from '../composables/useAuth'
import { routerCrypto } from './withdrawRouters/withdrawRoutersDesk/routerCrypto'
import { routerInternalTransfer } from './withdrawRouters/withdrawRoutersDesk/routerInternalTransfer'
import { routerWithdrawalMobile } from './withdrawRouters/withdrawRoutersMobile/routerWithdrawalMobile'
import { routerWithdrawal } from './withdrawRouters/withdrawRoutersDesk/routerWithdrawal'
import { routerInternalTransferMobile } from './withdrawRouters/withdrawRoutersMobile/routerInternalTransferMobile'
import { routerCryptoMobile } from './withdrawRouters/withdrawRoutersMobile/routerCryptoMobile'
import { routerCard } from './routerCard'
import { routerCardMobile } from './routerCardMobile'
import { useMediaQuery } from '../composables/useMediaQuery'

const { isMobile } = useMediaQuery()
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/forgot-password',
    component: () => import('../views/forgot-password/ForgotPassword.vue'),
  },
  {
    path: '/recovery-two-factor-auth',
    component: () => import('../views/recovery-two-factor-auth/Index.vue'),
  },
  {
    path: '/create-user',
    component: () => import('../views/register/CreateUser.vue'),
  },
  {
    path: '/confirm-email/:view',
    component: () => import('../views/register/ConfirmEmail.vue'),
  },

  {
    path: '/dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/Index.vue'),
      },
      {
        path: '/profile/:accountId',
        component: () => import('../views/profile/Profile.vue'),
        children: [
          {
            path: '',
            component: ProfileIndex,
          },
          {
            path: 'settings',
            component: () => import('../views/profile/settings/Index.vue'),
          },
        ],
      },
      {
        path: '/deposit',
        children: [
          {
            path: '',
            component: Deposit,
          },
          {
            path: 'fiat',
            component: () => import('../views/deposit/Fiat.vue'),
          },
          {
            path: 'crypto/:assetCode?',
            component: () => import('../views/deposit/Crypto.vue'),
          },
        ],
      },
      {
        path: '/withdraw',
        name: 'fiat',
        meta: { noCache: true },
        children: !isMobile.value ? routerWithdrawal : routerWithdrawalMobile,
      },
      {
        path: '/withdraw/crypto/internal',
        component: !isMobile.value ? () => import('../views/withdraw/Index.vue') : undefined,
        meta: { noCache: true },
        children: !isMobile.value ? routerInternalTransfer : routerInternalTransferMobile,
      },
      {
        path: '/withdraw/crypto',
        name: 'crypto',
        children: !isMobile.value ? routerCrypto : routerCryptoMobile,
      },
      {
        path: '/swap',
        children: [
          {
            path: '',
            component: SwapIndexVue,
          },
          {
            path: 'history',
            component: () => import('../views/swap/History.vue'),
          },
          {
            path: 'success',
            component: SwapSuccess,
          },
        ],
      },
      {
        path: '/wallet',
        children: [
          {
            path: '',
            component: WalletIndex,
          },
          {
            path: 'transactions/:assetCode',
            component: TransactionHistoryWallet,
          },
        ],
      },
      {
        path: '/transaction-history',
        children: [
          {
            path: '',
            component: TransactionHistory,
          },
        ],
      },
      {
        path: '/onboarding',
        component: () => import('../views/onboarding/index.vue'),
      },
      {
        path: '/onboarding/personal',
        meta: {
          noCache: true,
        },
        children: [
          {
            path: '',
            component: () => import('../views/onboarding/personal/index.vue'),
            children: [
              {
                path: 'personal-data',
                component: () => import('../views/onboarding/personal/PersonalData.vue'),
              },
              {
                path: 'investment-data',
                component: () => import('../views/onboarding/personal/InvestmentData.vue'),
              },
              {
                path: 'upload-documents',
                component: () => import('../views/onboarding/personal/UploadDocuments.vue'),
              },
              {
                path: 'completed',
                component: () => import('../views/onboarding/components/CompletedDocument.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/onboarding/business',
        meta: {
          noCache: true,
        },
        children: [
          {
            path: '',
            component: () => import('../views/onboarding/business/index.vue'),
            children: [
              {
                path: '',
                component: UploadDocumentsIndex,
              },
              {
                path: 'company-information',
                component: () => import('../views/onboarding/business/CompanyInformation.vue'),
              },
              {
                path: 'add-shareholders',
                component: () => import('../views/onboarding/business/AddShareholders.vue'),
              },
              {
                path: 'account-purpose',
                component: () => import('../views/onboarding/business/AccountPurpose.vue'),
              },
              {
                path: 'upload-documents',
                component: () => import('../views/onboarding/business/UploadDocuments.vue'),
              },
              {
                path: 'add-shareholders/new-shareholder',
                name: 'new-shareholder',
                component: () => import('../views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'add-shareholders/edit-shareholder/:dni',
                name: 'edit-shareholder',
                component: () => import('../views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'completed',
                component: () => import('../views/onboarding/components/CompletedDocument.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/cards/',
        component: () => import('../views/cards/Index.vue'),
        children: isMobile.value ? routerCardMobile : routerCard,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { getUserEmail } = useAuth()
  if (
    to.path !== '/' &&
    to.path !== '/create-user' &&
    !to.path.startsWith('/confirm-email/') &&
    to.path !== '/forgot-password' &&
    to.path !== '/recovery-two-factor-auth/' &&
    getUserEmail() === ''
  ) {
    next({ path: '/' })
  } else if (to.path === '/' && getUserEmail() !== '') {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router
