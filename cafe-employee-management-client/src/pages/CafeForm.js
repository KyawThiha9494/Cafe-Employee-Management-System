import React, { useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const CafeForm = ({ existingCafe }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (existingCafe) {
      setFormData(existingCafe);
    }

    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [existingCafe, isDirty]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = 'Name must be between 6 and 10 characters';
    }
    if (!formData.description || formData.description.length > 256) {
      newErrors.description = 'Description cannot exceed 256 characters';
    }
    if (formData.logo && formData.logo.size > 2 * 1024 * 1024) {
      newErrors.logo = 'Logo must be less than 2 MB';
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
      if (existingCafe) {
        // Perform update (PUT) request
        // axios.put('/café', formData)...
      } else {
        // Perform create (POST) request
        // axios.post('/café', formData)...
      }
      setIsDirty(false);
      router.navigate({ to: '/cafe' });
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    router.navigate({ to: '/cafe' });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{existingCafe ? 'Edit Café' : 'Add Café'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            maxLength={256}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Logo:</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.logo && <p style={{ color: 'red' }}>{errors.logo}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Submit
        </button>
        <button type="button" onClick={handleCancel} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CafeForm;
