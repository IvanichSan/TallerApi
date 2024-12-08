import React from 'react';

const Filter = ({ options, onFilter }) => {
    return (
        <select onChange={(e) => onFilter(e.target.value)}>
            <option value="">Todos</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Filter;
