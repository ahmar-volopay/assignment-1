import { useState } from 'react'
import './App.css'
import Table from './Components/table'

function App() {
  const headers = ['Name', 'Contact', 'Country'];
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
      <Table headers={headers} values={values}/>
    </>
  )
}

export default App
