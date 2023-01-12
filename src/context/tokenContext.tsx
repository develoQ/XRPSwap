import { createContext, FC, useContext, useEffect, useState } from 'react'

import { AuthContext } from './authContext'

import { CurrencyInfo } from '@/@types/xrpl'
import { getAccountTokensMeta } from '@/libs/xrpl'

type ContextState = {
  currencies: CurrencyInfo[]
}

export const TokenContext = createContext<ContextState>({} as any)

export const TokenContextProvider: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { state } = useContext(AuthContext)
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([])

  useEffect(() => {
    const XRP: CurrencyInfo = {
      currency: 'XRP',
      issuer: '',
      name: 'XRP',
      icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
      balance: 100_000_000_000,
    }
    if (state) {
      const f = async () => {
        const currencies = await getAccountTokensMeta(state.me.account)
        setCurrencies([XRP, ...currencies])
      }
      f()
    }
  }, [state])

  return (
    <TokenContext.Provider
      value={{
        currencies,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}
