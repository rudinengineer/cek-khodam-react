type Props = {
    progress: number,
    width: string
}

export default function Progress({progress, width}: Props) {
  return (
    <div>
        <div className="rounded-md p-1 border-[1px] border-primary" style={{ width: width }}>
            <div className="w-full py-2 bg-primary" style={{ width: progress + '%' }}></div>
        </div>
    </div>
  )
}