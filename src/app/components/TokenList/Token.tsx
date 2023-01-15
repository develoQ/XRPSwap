import Image from 'next/image'
import { FC, useContext, useMemo } from 'react'

import { CheckIcon } from '../Icon/Check'

import { TokensMarketData } from '@/@types/xrpl'
import { TokenContext } from '@/app/context/tokenContext'
import { usePayloadOpen } from '@/hooks/usePayloadOpen'
import { useSetTrustLine } from '@/hooks/useSetTrustLine'
import { parseCurrencyCode } from '@/utils/xrpl'

type Props = {
  index: number
  data: TokensMarketData
}

export const Token: FC<Props> = ({ index, data }) => {
  const { currencies } = useContext(TokenContext)
  const { setTrustLine } = useSetTrustLine()
  const { openWindow } = usePayloadOpen()

  const hasTrustLined = useMemo(() => {
    return currencies.some((c) => c.issuer === data.issuer && c.currency === parseCurrencyCode(data.currency))
  }, [currencies, data.currency, data.issuer])

  const handleSetTrustLine = async () => {
    const payload = await setTrustLine({
      issuer: data.issuer,
      currency: parseCurrencyCode(data.currency),
      value: data.supply.toString(),
    })
    if (payload) {
      openWindow(payload.next.always)
    }
  }
  return (
    <div className='card m-2 flex flex-col gap-6 rounded-xl bg-base-200 p-6 pt-8 shadow-xl'>
      <div className='flex'>
        <div className='w-full'>
          <div className='absolute top-2 left-4 font-bold'>#{index}</div>
          <div className='flex w-full justify-between'>
            <div className='flex items-center'>
              <div className='mr-2 flex h-8 w-8 items-center justify-center'>
                {data.logo && <Image src={data.logo} alt={data.currency} unoptimized height={32} width={32} />}
              </div>
              <div className='text-2xl'>{data.currency}</div>
            </div>
            <div className='text-3xl'>${data.price.toFixed(2)}</div>
          </div>
          <div className='ml-8 pl-2 text-sm text-gray-400'>{data.currency !== data.name ? data.name : data.issuer}</div>
          <div className='flex flex-col md:flex-row'>
            <div className='stat place-items-center pb-0'>
              <div className='stat-title'>Market Cap</div>
              <div className='stat-value text-xl'>${data.market_cap.toLocaleString()}</div>
              <div className='stat-desc'>&nbsp;</div>
            </div>
            <div className='stat place-items-center'>
              <div className='stat-title'>Volume</div>
              <div className='stat-value text-xl'>${data.volume.toLocaleString()}</div>
              <div className='stat-desc'>24h</div>
            </div>
            <div className='stat place-items-center pt-0'>
              <div className='stat-title'>Trades</div>
              <div className='stat-value text-xl'>{data.trades.toLocaleString()}</div>
              <div className='stat-desc'>24h</div>
            </div>
          </div>
          <div className='card-actions justify-end'>
            {hasTrustLined && (
              <button className='btn-disabled btn-primary btn-sm btn text-gray-200'>
                <CheckIcon className='-mt-1 mr-1 h-6 w-6 md:mt-auto md:mr-auto md:h-6 md:w-6' />
                Trustline
              </button>
            )}
            {!hasTrustLined && (
              <button className='btn-outline btn-primary btn-sm btn' onClick={handleSetTrustLine}>
                Set Trustline
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}