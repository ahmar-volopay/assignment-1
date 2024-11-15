import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, rows }) => (
    <div>
        <table className='border border-2 w-[70%] rounded-3xl'>
            <thead>
                <tr className='border-solid border-1'>
                    {headers.map((header) => (
                        <th 
                            key={header} 
                            className='px-4 py-2 border border-gray-300 bg-gray-100 text-left font-bold'>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id} className={rows.indexOf(row) % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                        {headers.map((header) => (
                            <td 
                                key={header} 
                                className="px-4 py-2 border-b border-gray-300 text-gray-700 font-semibold">
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,  
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            Name: PropTypes.string,
            Contact: PropTypes.string,
            Country: PropTypes.string,
        }).isRequired
    ).isRequired,
};

export default Table;
