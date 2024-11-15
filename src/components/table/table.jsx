import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, values }) => (
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
                {values.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
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
    values: PropTypes.arrayOf(PropTypes.object).isRequired,   
};

export default Table;
