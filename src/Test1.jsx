import React, { useState } from 'react';

function Test1() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.trim() !== '') {
      // Save the new category to the categories array
      setCategories((prevCategories) => [...prevCategories, category]);
      setCategory(''); // Reset the input field
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleInputChange}
          placeholder="Enter category"
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>

      {/* Display the list of categories */}
      {categories.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">Saved Categories:</h3>
          <ul className="list-disc pl-5">
            {categories.map((cat, index) => (
              <li key={index} className="mt-2">{cat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Test1;
