import axios, { AxiosInstance } from "axios";
// @ts-ignore
import CryptoJS from "crypto-js";

export abstract class HttpService {
  private client: AxiosInstance;
  private secret =
    "0d958e988f4e7856ff2a34638c6036403f4f8c674bb68a56121a03dd1729323f7e57c0aea5b6f1114f6dd80d19a5cb65d73c0656bc9548a519bdc6bea1df52505190a11a10cffdc8c0ab7957cab8bdd4812cb4d8e854e9c9f1ba21804677cb76a976d348d97b8e11124ea64388c8860b92c1f7d3f561f5390ec6d559afa1350601ebada57358344c20b08b039233f8d2eb7601142fb9b723af54ab61915efe6bcb3f631c0a15a6dcef76cdd54d7988e7123b5d75622f29dc5a9cc86904dee97ab923ebf3dcbfd2dbef9d5c28edd8078419954b9ef1dcea65c87edb955650bf5e77de7b52fd32ebb5fe00b16ed43a827536d6579d2dee597a919883cddc1a2577dcb7a61604395d3fce62879eb6273cd10b366ed312e2803058ea4801be3ad195edd6350383477b96c1910f05eb22262a2c0ac003d5540fd77d62549060fdb8fd56eb511fdbbdcedf6c1bde833650b8b9cbf24ebc872c3092c7f66d7f01d15f9c338ea8142347c94d02d019128ad7e11bf6c5b037ae9b5476f7428dc346af026d59c0a04ba91b7e5312559f8fffb38d12aed3b1165d4c27ca26f0d6681a45918e3ba4882176684e88eda7dc3d769a760abae88e27d323099876d10feb6dc6311b0c747186dc3f1e5b0fc838aac91d0cd905c50594d9d5e928194f7fec13b1a3fc97ced449f3fc073faa74408f7cc19d0587ed3cbe10e3f9031c94bc46352641759a0f2eb1d70cad03b0d02c23065e501bfb0b23d28076ced4857b49525a5aa97ab0ff6da1ad8e2cb82848481d870caca7922914ac29ca9209cc6efbef3bba5fa7c262cfc2917f4664354787184a403ded6549ecbda0422a32d386f833d0aadeebb4519aefd82d7d1f813c6d82fda0913afa97e7febfab1f5818c1cbfbc2b1c8cb85fb9e800b8a39b2de98892d3bcc7c3a52482e4f515c7ad543695eddc29c6dd714d0e41b4f359a2d931a2f68d1f308e35dcd11da9e0fac57cead2e331c886966fdcb2922a74d5f7454ae928a4975e884d2d445c830ee399e73c33e0f7395aed8a3a0ae43bce637d53aec19051bb20591b1ee74cea0a93f34975fcccfb3767ce2e5f94bdb10da16f6a156cddeb1b42fd921eabe715f6cf287d4e3e64ebda7e962aea7b5577040698effe9f444b6629b392d5cefbc7e2de590cca31fb0919ed0c52468665d06b06eef4d5c9ecab46b2f3a91c7ee26b4a8fbfcf7efaea1c80f9aaf1931166ff184ca7e526fc064590ba1b8e95b049e8849555fecb719aa5e72c24d52e0c416ce0974657a29932dfda55754e7739d4dbca41ee8ec868e97041ec945492ea88940931b47d27a23ad3344b7432839467e84e4379add93b6e9061d48e65d859fba28128982e0e043bc24f10af2fdacbc240a6e457c5ebca5365d03675f543065d1a0ea484e964f74669b77cfb86257145c761db75827eef70aff6fd1dce9e4f49dc4aebfcf0fd41a271edc2b0806296d7d8a6a5f4ff6f163bcd0b22fd59b12561e99d6d94fff4b373bfd0653f772b30d66e1cc938879b4777d4906226d3499a75e3d5fda4535c708967b0c144212be6507d18941adf6b10f66489bfaaf46509366ce300926da15226e4c136f072e6e7649b4ba14077d30f7a0ff7b3eeeb39f8132e47cad429b951a36dc5c42fa408b515816d8232725b8316718e2dcab50207d874e347d71d7556f9dd0d3758d317b0df0cad4e53f18c7b0c2c42913a13f5435bc31f0a0f13c22e225681f99a95f00cbdf39c7de8e47380d08db2446629628810929e1bc7be21652a71649be3ac660d318a48778056bac1cf3184238242e3315293879e8f08cf5c6ebc404929a15141aa667203e8cb53ee09c3a9f780a4fdff92f0de262f1de03e64a67016a614db1d51e4d49f0e3a56a614d061d69a2c0e53133a4e72e29027025aecedd4c29f049b5fc2965f5b18408b6f1d900fcc2ab55139353b7ca652a0367fe07c46fc85c3712bc96bb8430b127f8ee09a0dda2a9ea01933f491c5eb1b05d20b99f182fa7e828430683e6eb1618ef752c6e3ec054b91c989133bf5c88ff4d1167499eb2bb409d8d2982e0641c5f20d558ca0099ceeae013bce99c2c8e854ace2eaeb4720f744bb083ed951efd558e299dc272e0af87d5c42dca4c31ef92d94fe7bf26d65e117b5d56498bcc438e32c513ea8ac30d7856a9a144c7dbcd816d48d8f5b5ed8e40654c2793557e42f92a1548ecb99060c2373028ed3c5c369aa7398bba53ea0fcd6d516febacc8a287f00087cf315d1962f3336932125ac906560f8520d54a853ac561cc2a002b7afef63b7587ac2479a685c640d0e2a5b05eaca8d50b22060d36daf5adc31508ef35a7e4d0b30d9dd34dac90a45f8ea7dd2c11b3a8762a825130d345e8bdfc2598b894ee0a143a957ff69918a6ef0207f063a04d3cf37fbb5db51f60012ae7afccfd564c07fe70b1e90839c7e4fea1b3bf01f51f5a2c842f72a43ce91e7903210f27b8eb7fdcccb13086c16e3710a220da55d49ec466094d426aaa37ea54853a52c72d692929fa156d875701a0224e373eaa90181f2d21a51cff077b272dfdb5a3a727d9de46c1e1a9b804ceed39df4cb8aeb32487af66dc9fbe63b91aec8d09de0fd98010be94d43aa271e30ab433bf72c14113774401ccbbad70f3615ce0f705defdff95062c343cbab38069ff32725507eaca57830464994442e95e40af96e7daa5fe098c657cfc563987f2abd26cc015f3853851c30f6dd6fd5c066d3039b956b33f854de884684500f95b79e7566b5e9a33a4b8288174cc4fca5e07c43972b793a87a5f235dda19c8b9c1d4eafe8f8c27d5973cd1312c57b4d0ccb216c0e778d265acd61fb78db778aedf3fe644fc47ed718b81110e158ec8bb4237742402420b2ad8ef0f87";

  constructor(urlAPI: string) {
    this.client = axios.create({
      baseURL: urlAPI,
    });
  }

  private async authAPI() {
    const response = await this.post<any>("/auth", {}, false);
    sessionStorage.setItem("noba", this.encrypt(response.token));
    return response.token;
  }

  protected setToken(token: string) {
    sessionStorage.setItem("noba", this.encrypt(token));
  }

  private encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, this.secret).toString();
  }

  private decrypt(hash: string) {
    const bytes = CryptoJS.AES.decrypt(hash, this.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public async getToken<T>(): Promise<string | undefined> {
    const token = sessionStorage.getItem("noba");
    if (!token) {
      return undefined;
    }
    return this.decrypt(token);
  }

  private async getHeader(method: string, isFormData: boolean = false) {
    let token = await this.getToken();
    if (!token) {
      // token = await this.authAPI();
      token = ''
    }
    const type = isFormData ? "multipart/form-data" : "application/json";
    return {
      headers: {
        "Content-Type": type,
        Authorization: "Bearer " + token,
        Origin: window.origin,
      },
    };
  }

  public async post<T>(
    url: string,
    form: any,
    isPrivate: boolean = true,
    isFormData: boolean = false
  ): Promise<T> {
    let headerRequest: any;
    if (isPrivate) {
      headerRequest = await this.getHeader("POST", isFormData);
    } else {
      headerRequest = {};
    }

    const response = await this.client.post(url, form, headerRequest);

    return response.data as T;
  }

  public async get<T>(url: string, dados = {}, isPrivate = true): Promise<T> {
    let data: any;
    if (isPrivate) {
      data = await this.client.get(url, await this.getHeader("GET"));
    } else {
      data = await this.client.get(url, dados);
    }

    return data.data.data as T;
  }
}