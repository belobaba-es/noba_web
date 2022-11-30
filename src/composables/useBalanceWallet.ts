import { ref } from 'vue'
import { AssetsService } from '../views/deposit/services/assets'
import { useBalanceWalletStore } from '../stores/balanceWallets'
import { storeToRefs } from 'pinia'
import { BalanceWallet } from '../views/deposit/types/asset.interface'

export const useBalanceWallet = () => {
  const assetsService = AssetsService.instance()

  const balanceWalletStore = useBalanceWalletStore()
  const balanceWallets = storeToRefs(balanceWalletStore)

  const submitting = ref(false)

  const fetchBalanceWallets = async () => {
    submitting.value = true
    balanceWallets.wallets.value = await assetsService.getBalanceWallets()

    submitting.value = false
  }

  const getBalanceByCode = (assetCode: string): number => {
    return balanceWalletStore.getBalanceByCode(assetCode)
  }

  const getWalletByAssetCode = (assetCode: string): BalanceWallet | undefined => {
    return balanceWalletStore.getWalletByAssetCode(assetCode)
  }

  const updateBlockedBalanceWalletByCode = (assetCode: string, blockedBalance: number): void => {
    balanceWalletStore.updateBlockedBalanceWalletByCode(assetCode, blockedBalance)
  }

  return {
    fetchBalanceWallets,
    getBalanceByCode,
    getWalletByAssetCode,
    updateBlockedBalanceWalletByCode,
  }
}
