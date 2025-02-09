import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'
import { CardModality } from '../enums/cardModality.enum'

const typeCardSelect = ref<CardModality[]>([] as CardModality[])

export const useLayoutCard = () => {
  const router = useRouter()
  const { t } = useI18n({ useScope: 'global' })
  const { selectedCard, cardInfo } = useCardCenter()

  const itemsDefault = [
    {
      label: t('labelHistorialCard'),
      command: () => {
        router.push('/cards/transactions-card')
      },
      disabled: false,
    },
    {
      label: t('labelRecargaCard'),
      command: () => {
        router.push('/cards/recharge-card')
      },
      disabled: false,
    },
    {
      separator: true,
    },
    {
      label: t('labelBlockCard'),
      command: () => {
        router.push('/cards/block-card')
      },
      disabled: false,
    },
  ]

  let itemsMenuLayout = ref()

  watch(cardInfo, () => {
    if (selectedCard.value?.isPhysical) {
      itemsMenuLayout.value = itemsDefault.concat({
        label: t('labelPinChange'),
        command: () => {
          router.push('/cards/change-pin')
        },
        disabled: false,
      })
      itemsMenuLayout.value = itemsMenuLayout.value.concat({
        label: t('labelBlockCard'),
        command: () => {
          router.push('/cards/block-card')
        },
        disabled: false,
      })
    } else {
      itemsMenuLayout.value = itemsDefault
    }
  })

  return { itemsMenuLayout, typeCardSelect }
}
