import { HttpService } from '../../../shared/services/http'
import {
  BeneficiariesInternalResponse,
  BeneficiaryAsset,
  BeneficiaryAssetsResponse,
  BeneficiaryType,
} from '../types/beneficiary.interface'
import { TypeBeneficiaryInternal } from '../composables/useBeneficiary'

export class BeneficiaryService {
  async listBeneficiaryAssets(nextPag = 1): Promise<BeneficiaryAssetsResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<BeneficiaryAssetsResponse>(
      `beneficiary/asset/${nextPag}`
    )
  }

  async listBeneficiaryBankingExternal(beneficiaryType: BeneficiaryType, nextPag = 1) {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<any>(
      `beneficiary/banking/external/${nextPag}?withdrawalType=${beneficiaryType}`
    )
  }

  async listBeneficiaryInternal(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<BeneficiariesInternalResponse>(
      `beneficiary/${type}/internal/${nextPag === 0 ? 1 : nextPag}`
    )
  }

  async listBeneficiaryInternalV2(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT_V2).get<BeneficiariesInternalResponse>(
      `beneficiary/internal/${nextPag === 0 ? 1 : nextPag}`
    )
  }

  async saveBeneficiary(payload: any): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(`beneficiary/banking`, payload)
  }

  async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).post<any>(`beneficiary/asset`, payload)
  }
}
