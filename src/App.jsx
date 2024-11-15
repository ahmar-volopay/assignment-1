import './App.css'
import Table from './Components/Table/table'
import { Table_Headers } from './Components/constants/tableHeaders';
function App() {
  const values = [
    { Name: 'Alfreds Futterkiste', Contact: 'Maria Anders', Country: 'Germany' },
    { Name: 'Centro comercial Moctezuma', Contact: 'Francisco Chang', Country: 'Mexico' },
    { Name: 'Ernst Handel', Contact: 'Roland Mendel', Country: 'Austria' },
    { Name: 'Island Trading', Contact: 'Helen Bennett', Country: 'UK' },
    { Name: 'Laughing Bacchus Winecellars', Contact: 'Yoshi Tannamuri', Country: 'Canada' },
    { Name: 'Magazzini Alimentari Riuniti', Contact: 'Giovanni Rovelli', Country: 'Italy' },
  ];

  return (
    <>
      <Table headers={Table_Headers} values={values}/>
    </>
  )
}

export default App
