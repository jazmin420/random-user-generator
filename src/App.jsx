import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
    const [users, setUsers] = useState([]);
    const [color, setColor] = useState(getRandomColor());
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/users');
          if (response.data && response.data.users) {
            setUsers(response.data.users);
          } else {
            console.error('Unexpected API response', response);
          }
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const refresh = () => {
      setColor(getRandomColor());
      setCurrentIndex((currentIndex + 1) % users.length);
    };
  

  return (
    <>
       <h1>Random user on refresh</h1>
       <div className='conatiner' style={{ backgroundColor: color}}>
          {users.length > 0 && currentIndex < users.length && (
         <div className='flex-container'>
           <div className='left-div'>
            <div className='img-div'>
            <img src={users[currentIndex].image} alt="" />
            <h3>{users[currentIndex].firstName} {users[currentIndex].lastName}</h3>
            <p>{users[currentIndex].gender}</p>
            </div>
            
            <div>
              <div className='flex-container'>
              <div>
                <p><strong>Birthdate:</strong>
                 <span  className='block-span'>{users[currentIndex].birthDate}</span></p>
                <p><strong>Weight:</strong>
                 <span  className='block-span'>{users[currentIndex].weight} kg</span></p>
              </div>
              <div>
                 <p><strong>Height:</strong><span className='block-span'>{users[currentIndex].height} cm</span></p>
                  <p><strong>Age:</strong>
                   <span  className='block-span'>{users[currentIndex].age} years</span></p>
              </div>
                 
               </div>
            </div>
           </div>
           <div>
            <p><strong>Home Address:</strong>
             <span className='block-span'>{users[currentIndex].address.address}, {users[currentIndex].address.city}, {users[currentIndex].address.state}, {users[currentIndex].address.postalCode}</span></p>
            <p><strong>Company:</strong>
             <span  className='block-span'>{users[currentIndex].company.name}</span></p>
            <p><strong>Phone:</strong>
             <span  className='block-span'> {users[currentIndex].phone}</span></p>
            <p><strong>Email:</strong> 
             <span className='block-span'>{users[currentIndex].email}</span></p>
           </div>
         </div>
         
      )}
      <div className='button-center'>
        <button onClick={refresh}>Refresh</button>
      </div>
    </div>
    </>
  )
}

export default App
