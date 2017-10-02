import { AxiosResponse } from 'axios'
import * as qs from 'querystring'
import Client, { ISiteArgs } from '../client'
import * as util from '../util'

export interface ISaveCardArgs extends ISiteArgs {
  SeqMode?: util.SeqMode
  CardSeq?: number
  DefaultFlag?: string
  CardName?: string
  CardNo?: string
  CardPass?: string
  Expire?: string
  HolderName?: string
  Token?: string
}

export interface ISaveCardResult {
  CardSeq: string
  CardNo: string
  Forward: string
  Brand?: string
  DomesticFlag?: string
  IssuerCode?: string
  DebitPrepaidFlag?: string
  DebitPrepaidIssuerName?: string
  ForwardFinal?: string
}

export interface IDeleteCardArgs extends ISiteArgs {
  SeqMode?: util.SeqMode
  CardSeq: string
}

export interface IDeleteCardResult {
  CardSeq: string
}

export interface ISearchCardArgs extends ISiteArgs {
  SeqMode: util.SeqMode
  CardSeq?: string
}

export interface ISearchCardResult {
  CardSeq: string
  DefaultFlag: string
  CardName: string
  CardNo: string
  Expire: string
  HolderName: string
  DeleteFlag: string
  Brand?: string
  DomesticFlag?: string
  IssuerCode?: string
  DebitPrepaidFlag?: string
  DebitPrepaidIssuerName?: string
  ForwardFinal?: string
}

export default class Card extends Client {
  public async save(args: ISaveCardArgs): Promise<ISaveCardResult> {
    const res: AxiosResponse = await this.client.post('/payment/SaveCard.idPass', args)

    return qs.parse(res.data)
  }

  public async del(args: IDeleteCardArgs): Promise<IDeleteCardResult> {
    const res: AxiosResponse = await this.client.post('/payment/DeleteCard.idPass', args)

    return qs.parse(res.data)
  }

  public async search(args: ISearchCardArgs): Promise<ISearchCardResult[]> {
    const res: AxiosResponse = await this.client.post('/payment/SearchCard.idPass', args)
    const result = qs.parse(res.data)

    const cardSeqArry: string[] = result.CardSeq.split('|')
    const defaultFlagArry: string[] = result.DefaultFlag.split('|')
    const cardNameArry: string[] = result.CardName.split('|')
    const cardNoArry: string[] = result.CardNo.split('|')
    const expireArry: string[] = result.Expire.split('|')
    const holderNameArry: string[] = result.HolderName.split('|')
    const deleteFlagArry: string[] = result.DeleteFlag.split('|')

    return cardSeqArry.map((cardSeq, index) => {
      return {
        CardSeq: cardSeq,
        DefaultFlag: defaultFlagArry[index],
        CardName: cardNameArry[index],
        CardNo: cardNoArry[index],
        Expire: expireArry[index],
        HolderName: holderNameArry[index],
        DeleteFlag: deleteFlagArry[index]
      }
    })
  }
}
