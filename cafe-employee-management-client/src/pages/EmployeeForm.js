import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useNavigate } from '@tanstack/react-router';

const EmployeeForm = () => {

  const {id} = useParams({ from: '/employee-form/$id'} );

  //const navigate = useNavigate();

  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    assignedCafe: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id !== 'create') {
      // Fetch employee data based on employeeId
      console.log('Fetching data for employeeId:', id);
      // Example employee data fetching logic
      const employeeData = {
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        gender: 'male',
        assignedCafe: 'Cafe1',
      };
      setFormData(employeeData);
    } else {
      console.log('No employeeId found in URL');
      // Clear form data if no employeeId
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        assignedCafe: '',
      });
    }
  }, [id]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = '* Name must be between 6 and 10 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '* Invalid email address';
    }
    if (!formData.phoneNumber || !/^[89]\d{7}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '* Phone number must start with 8 or 9 and have 8 digits';
    }
    if (!formData.gender) {
      newErrors.gender = '* Gender is required';
    }
    if (!formData.assignedCafe) {
      newErrors.assignedCafe = '* Please select a café';
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
      //navigate('/employee');
      router.navigate({ to: `/employee` });   
    }
  };

  const handleCancel = () => {
    //navigate('/employee');
    router.navigate({ to: `/employee` });   
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{id !== 'create' ? 'Edit Employee' : 'Add Employee'}</h2>
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
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
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
            {errors.gender && <p className="error-message">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label>Assigned Café:</label>
            <select
              name="assignedCafe"
              value={formData.assignedCafe}
              onChange={handleChange}
            >
              <option value="">Select a café</option>
              <option value="Cafe1">Café 1</option>
              <option value="Cafe2">Café 2</option>
            </select>
            {errors.assignedCafe && <p className="error-message">{errors.assignedCafe}</p>}
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

export default EmployeeForm;
