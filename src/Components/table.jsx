import React from 'react';

const Table = ({ headers, values }) => {
    return (
        <>
            <div>
                <table className='border-double border-2'>
                    <thead>
                        <tr className='border-solid border-1'>
                            {headers.map((headers) => (
                                <th key={headers} className='px-4 py-1 border border-gray-300 bg-gray-100 text-left font-bold'>{headers}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((row, rowInd) => (
                            <tr key={rowInd} className={rowInd % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                {headers.map((header) => (
                                    <td key={header} className="px-2 py-4 border-b border-gray-300 text-gray-700 font-semibold">
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;