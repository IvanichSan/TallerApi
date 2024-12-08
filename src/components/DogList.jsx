import React from 'react';

const DogList = ({ dogs, onSelect }) => {
    return (
        <ul>
            {dogs.map((dog) => (
                <li key={dog.id} onClick={() => onSelect(dog)}>
                    <img src={dog.image.url} alt={dog.name} width="100" />
                    <h3>{dog.name}</h3>
                </li>
            ))}
        </ul>
    );
};

export default DogList;
