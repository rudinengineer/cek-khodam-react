import React from 'react'
import { khodamList } from './constants/khodam'

type Props = {}

export default function Api({}: Props) {
  const [result, setResult] = React.useState<string>('')

  React.useEffect(() => {
    setResult(khodamList[Math.floor(Math.random() * khodamList.length)])
  }, [])

  return result && (
    <code>
        {
            JSON.stringify({
                data: result
            })
        }
    </code>
  )
}