import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useNavigate } from '@tanstack/react-router';
import '../styles/CafeForm.css';
import axios from 'axios';

const CafeForm = () => {
  const {id} = useParams({ from: '/cafe-form/$id'} );

  const navigate = useNavigate();
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (id !== 'create') {
      console.log('Fetching data for cafeId:', id);
      const fetchCafes = async () => {
        try {
          const { data } = await axios.get(`https://localhost:7099/api/Cafes/GetCafe/${id}`);
          console.log("Get Cafe by ID: "+ JSON.stringify(data));
          setFormData(data);
        } catch (error) {
          console.error('Error fetching cafe data:', error);
        }
      };
      fetchCafes();
    } else {
      console.log('No cafeId found in URL');

      setFormData({
        name: '',
        description: '',
        logo: null,
        location: '',
      });
    }
  }, [id]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = '* Name must be between 6 and 10 characters';
    }
    if (!formData.description || formData.description.length > 256) {
      newErrors.description = '* Description cannot exceed 256 characters';
    }
    if (!formData.location) {
      newErrors.location = '* Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setIsDirty(true);
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (id === 'create') {
          // Create a new cafe
          console.log("Create New : "+ JSON.stringify(formData));
          await axios.post('https://localhost:7099/api/Cafes/CreateCafe', formData);
        } else {
          // Update existing cafe
          console.log("Update : "+ JSON.stringify(formData));
          await axios.put(`https://localhost:7099/api/Cafes/UpdateCafe/${id}`, formData);
        }
        router.navigate({ to: `/cafe` });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };


  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    router.navigate({ to: `/cafe` });   
    //navigate('/cafe');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{id !== 'create' ? 'Edit Café' : 'Add Café'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={256}
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          <div className="form-group">
            <label>Logo:</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.logo && <p className="error-message">{errors.logo}</p>}
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>

          <button type="submit" className="button button-submit">
            Submit
          </button>
          <button type="button" onClick={handleCancel} className="button button-cancel">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CafeForm;
