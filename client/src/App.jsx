import React, { useEffect, useState } from 'react';

const App = () => {
  // Ma'lumotni saqlash uchun useState
  const [data, setData] = useState([]);
  
  // useEffect ichida fetch so'rovini bajarish
  useEffect(() => {
    // API so'rovini yuborish
    fetch("http://localhost:3000/api/v1/user/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setData(data.data)) // Ma'lumotlarni state ga saqlash
      .catch((err) => console.error("Fetch error:", err)); // Xatolikni tutish
  }, []); // Faqat bir marta ishlash uchun bo'sh massivni qo'yamiz

  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-3xl '>User List</h1>
      <div className='flex justify-center flex-wrap gap-10 my-5'>
      {data.length === 0 ? ( // Agar data bo'sh bo'lsa
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <div key={item.id} className='border rounded p-5'>
            <h2>{item.name}</h2>
            <p>Age: {item.age}</p>
            <p>Email: {item.email}</p>
            <a className='bg-blue-400 text-white px-4 py-2 rounded text-center my-5 block' href={`tel:${item.callnumber}`}>Call</a>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default App;
