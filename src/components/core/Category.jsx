import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {name}
    </button>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired, 
  onClick: PropTypes.func.isRequired
};

export default Category;
