import { FC } from 'react'

type Props = {
  className?: string
}
export const CheckIcon: FC<Props> = ({ className }) => {
  return (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' fill='none'>
      <path
        fill='currentColor'
        d='M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z'
      />
    </svg>
  )
}
