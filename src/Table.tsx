import React from 'preact'

interface TableProps {
  data: IData[];
  isLoading: boolean;
  error: any;
}

const Table: React.FunctionComponent<TableProps> = ({ data, isLoading, error }) => {
  const getColor = (index: number, item: IData, key: 'total' | 'ptw' = 'total'): string => {
    if (index === 0) {
      return 'bg-green-500/50';
    }

    const prev = Number(data[index - 1][key]);
    const current = Number(item[key]);

    if (prev > current) {
      return 'bg-green-500/50';
    }

    if (current > prev) {
      return 'bg-red-500/50';
    }

    return 'bg-zinc-500/50';
  }

  return (
    <table className="w-full text-sm">
      <thead className="border-b border-zinc-600">
        <tr>
          <th className="px-4 py-3 font-medium text-left">Date</th>
          <th className="px-4 py-3 font-medium text-right">PTW</th>
          <th className="px-4 py-3 font-medium text-right">Now</th>
          <th className="px-4 py-3 font-medium text-right">Done</th>
          <th className="px-4 py-3 font-medium text-right">Hold</th>
          <th className="px-4 py-3 font-medium text-right">Drop</th>
          <th className="px-4 py-3 font-medium text-right">Left</th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {isLoading && (
          <>
            {[1,2,3,4,5].map(item => (
              <tr key={item}>
                <td colSpan={7} className="px-4 py-3">Loading...</td>
              </tr>
            ))}
          </>
        )}
        {Boolean(error) && (
          <tr>
            <td colSpan={7} className="px-4 py-3">{String(error)}</td>
          </tr>
        )}
        {data.map((item, index) => (
          <tr key={item.date} className="border-b border-zinc-700">
            <td className="px-4 py-3">{item.date}</td>
            <td className="px-4 py-3 text-right">{item.ptw}</td>
            <td className="px-4 py-3 text-right">{item.watching}</td>
            <td className="px-4 py-3 text-right">{item.done}</td>
            <td className="px-4 py-3 text-right">{item.onhold}</td>
            <td className="px-4 py-3 text-right">{item.drop}</td>
            <td className={`px-4 py-3 text-right ${getColor(index, item)}`}>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
