import React from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                navigate(`/search?s=${searchTerm}`);
            }
        },500);
        
        return () => {
            clearTimeout(delay);
        }
    },[searchTerm, navigate]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

  return (
    <div>
      <input type="text" name="search" onChange={handleChange} />
    </div>
  )
}

export default Search
