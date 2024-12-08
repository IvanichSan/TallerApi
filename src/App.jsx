import React, { useState, useEffect } from 'react';
import { fetchDogs } from './services/dogApi'; // Servicio para consumir la API
import DogList from './components/DogList'; // Componente para mostrar la lista de perros
import SearchBar from './components/SearchBar'; // Componente de búsqueda
import Filter from './components/Filter'; // Componente de filtro

const App = () => {
    const [dogs, setDogs] = useState([]); // Lista completa de perros
    const [filteredDogs, setFilteredDogs] = useState([]); // Lista filtrada
    const [searchQuery, setSearchQuery] = useState(''); // Búsqueda
    const [filter, setFilter] = useState(''); // Filtro
    const [selectedDog, setSelectedDog] = useState(null); // Perro seleccionado
    const [error, setError] = useState(null); // Manejo de errores

    // Cargar datos de la API
    useEffect(() => {
        const getDogs = async () => {
            try {
                const data = await fetchDogs();
                setDogs(data);
                setFilteredDogs(data); // Inicialmente mostrar todos los perros
            } catch (err) {
                setError('Hubo un problema al cargar los datos de la API.');
            }
        };

        getDogs();
    }, []);

    // Manejar la búsqueda y el filtro
    useEffect(() => {
        let results = dogs;

        // Filtrar por búsqueda
        if (searchQuery) {
            results = results.filter((dog) =>
                dog.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (filter) {
            results = results.filter((dog) => dog.breed_group === filter);
        }

        setFilteredDogs(results);
    }, [searchQuery, filter, dogs]);

    return (
        <div>
            <h1>Dog App</h1>

            {/* Mostrar error si ocurre */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Barra de búsqueda */}
            <SearchBar query={searchQuery} onSearch={setSearchQuery} />

            {/* Filtro por categoría */}
            <Filter
                options={['Herding', 'Sporting', 'Working', 'Terrier', 'Non-Sporting']}
                onFilter={setFilter}
            />

            {/* Lista de perros */}
            <DogList dogs={filteredDogs} onSelect={setSelectedDog} />

            {/* Detalles del perro seleccionado */}
            {selectedDog && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{selectedDog.name}</h2>
                    <img src={selectedDog.image.url} alt={selectedDog.name} width="200" />
                    <p><strong>Temperamento:</strong> {selectedDog.temperament}</p>
                    <p><strong>Grupo:</strong> {selectedDog.breed_group || 'Desconocido'}</p>
                    <p><strong>Origen:</strong> {selectedDog.origin || 'Desconocido'}</p>
                </div>
            )}
        </div>
    );
};

export default App;
