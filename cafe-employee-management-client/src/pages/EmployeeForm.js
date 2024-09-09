import React, { useState, useEffect }  from 'react';
import { useRouter } from '@tanstack/react-router';


const EmployeeForm = ({ existingEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    assignedCafe: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter(); 

  useEffect(() => {
    if (existingEmployee) {
      setFormData(existingEmployee);
    }
  }, [existingEmployee]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = 'Name must be between 6 and 10 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phoneNumber || !/^[89]\d{7}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must start with 8 or 9 and have 8 digits';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting form data:', formData);
      router.navigate({ to: '/employee' });
    }
  };

  const handleCancel = () => {
    router.navigate({ to: '/employee' });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{existingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            /> Male
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            /> Female
          </div>
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Assigned Café:</label>
          <select
            name="assignedCafe"
            value={formData.assignedCafe}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          >
            <option value="">Select a café (optional)</option>
            <option value="Cafe1">Café 1</option>
            <option value="Cafe2">Café 2</option>
          </select>
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

export default EmployeeForm;
