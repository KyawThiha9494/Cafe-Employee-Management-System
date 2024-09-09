import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useNavigate } from '@tanstack/react-router';
import '../styles/CafeForm.css';

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
      // Fetch existing cafe data based on id
      console.log('Fetching data for cafeId:', id);
      // Example café data fetching logic
      const cafeData = {
        name: 'Cafe Example',
        description: 'A cozy place for coffee.',
        logo: null, // Update this with actual logic if needed
        location: 'Location Example',
      };
      setFormData(cafeData);
    } else {
      console.log('No cafeId found in URL');
      // Clear form data if no cafeId
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
    if (!formData.logo) {
      newErrors.logo = '* Logo is required';
    } else if (formData.logo.size > 2 * 1024 * 1024) {
      newErrors.logo = '* Logo must be less than 2 MB';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting form data:', formData);
      if (id !== 'create') {
        // Update existing café logic here
        console.log('Updating cafe:', id);
      } else {
        // Add new café logic here
        console.log('Adding new cafe');
      }
      setIsDirty(false);
      router.navigate({ to: `/cafe` }); 
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
