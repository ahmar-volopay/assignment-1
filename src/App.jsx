import './App.css'
import Table from './Components/Table/table'
import { Table_Headers } from './Components/constants/tableHeaders';
function App() {
  const values = [
    { id: 1, Name: 'Alfreds Futterkiste', Contact: 'Maria Anders', Country: 'Germany' },
    { id: 2, Name: 'Centro comercial Moctezuma', Contact: 'Francisco Chang', Country: 'Mexico' },
    { id: 3, Name: 'Ernst Handel', Contact: 'Roland Mendel', Country: 'Austria' },
    { id: 4, Name: 'Island Trading', Contact: 'Helen Bennett', Country: 'UK' },
    { id: 5, Name: 'Laughing Bacchus Winecellars', Contact: 'Yoshi Tannamuri', Country: 'Canada' },
    { id: 6, Name: 'Magazzini Alimentari Riuniti', Contact: 'Giovanni Rovelli', Country: 'Italy' },
  ];

  return (
    <>
      <Table headers={Table_Headers} rows={values}/>
    </>
  )
}

export default App
