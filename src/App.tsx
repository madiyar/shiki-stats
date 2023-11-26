import { useState } from "preact/hooks";
import useSWR, { Fetcher } from "swr"
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'

import Table from "./Table";
import Charts from "./Charts";

dayjs.extend(customParseFormat)

const fetcher: Fetcher<IData[], string> = (...args) => fetch(...args).then(res => res.json());

export function App() {
  const [showChart, setShowChart] = useState(false);

  const { data = [], isLoading, error } = useSWR(import.meta.env.VITE_API_URL, fetcher);

  const getSeries = (key: IKey) => ({
    label: key,
    data: data.map(item => ({ primary: dayjs(item.date, 'DD.MM.YYYY').toISOString(), secondary: Number(item[key]) }))
  });

  return (
    <div className="container max-w-7xl mx-auto">
      <header className="header">
        <h1 className="text-lg font-medium">Shikimori Stats</h1>
        <button onClick={() => setShowChart(v => !v)} className={`toggle-btn ${showChart && 'bg-green-600 ring-green-900/60'} md:hidden`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
          </svg>
        </button>
      </header>
      <main className="flex flex-col md:flex-row p-4 md:p-9 gap-8 pb-32 md:pb-9">
        <section className={`md:block flex-1 border border-zinc-700 rounded-lg p-3 relative w-full overflow-auto ${!showChart ? 'block' : 'hidden'}`}>
          <Table data={data} isLoading={isLoading} error={error} />
        </section>
        <aside className={`md:basis-2/5 md:flex flex-col gap-8 ${showChart ? 'flex' : 'hidden'}`}>
          {!isLoading ? (
            <>
              <Charts
                data={[
                  getSeries('ptw'),
                  getSeries('watching'),
                  getSeries('done'),
                  getSeries('onhold'),
                  getSeries('drop'),
                  getSeries('total'),
                ]}
              />
              <Charts
                data={[
                  getSeries('total'),
                ]}
              />
            </>
          ) : [1,2].map(item => (
            <div key={item} className="h-80 border border-zinc-700 rounded-lg" />
          ))}
        </aside>
      </main>
    </div>
  )
}
