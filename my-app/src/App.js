import './App.css';
import Pagination from './Pagination'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

let counter = 0;

const getUniqueId = () => {
  	return ++counter;
};

function App() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() =>{
    axios
    .get('https://reqres.in/api/products')
      .then(res =>{
        setItems(res.data.data)
      })
      .catch(err =>{
        console.log(err)
      })
  },[]);

  const filter = e => {
    setSearch(e.target.value)
  }

  const filtredItems = items.filter(item =>
    item.id.toString().includes(search.toString())
  )

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtredItems.slice(indexOfFirstItem, indexOfLastItem)
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

   return (
     <div className="app">
         Filter by ID:<input className='input' type="number" maxLength="100" onChange={filter} />
            {currentItems.map(post =>   (
               <ul key={getUniqueId()}>
                <li style={{backgroundColor: post.color}}>ID:{post.id}</li>
                <li style={{backgroundColor: post.color}}>name:{post.name}</li>
                <li style={{backgroundColor: post.color}}>year:{post.year}</li>
               </ul>
            ))}
             <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={items.length}
              paginate={paginate}
             />
    </div>
   );
 }

export default App;
