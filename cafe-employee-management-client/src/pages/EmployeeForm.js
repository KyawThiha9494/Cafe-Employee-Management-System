import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useNavigate } from '@tanstack/react-router';
import axios from 'axios';

const EmployeeForm = () => {

  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const {id} = useParams({ from: '/employee-form/$id'} );

  //const navigate = useNavigate();

  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    gender: '',
    CafeId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const { data } = await axios.get('https://localhost:7099/api/Cafes/GetCafes');
        setCafes(data);
      } catch (error) {
        setFetchError('Error fetching cafes data');
      }
    };

    if (id !== 'create') {
      const fetchEmployee = async () => {
        try {
          const { data } = await axios.get(`https://localhost:7099/api/Employee/GetEmployee/${id}`);
          console.log("Get Employee by ID: "+ JSON.stringify(data));
          setFormData({
            ...data,
            CafeId: data.cafeId,
          });
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
      fetchEmployee();
    } else {
      console.log('No employeeId found in URL');
      // Clear form data if no employeeId
      setFormData({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        gender: '',
        CafeId: '',
        CafeName: '',
      });
    }

    fetchCafes().finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = '* Name must be between 6 and 10 characters';
    }
    if (!formData.emailAddress || !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = '* Invalid email address';
    }
    if (!formData.phoneNumber || !/^[89]\d{7}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '* Phone number must start with 8 or 9 and have 8 digits';
    }
    if (!formData.gender) {
      newErrors.gender = '* Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (id === 'create') {
          // Create a new employee
          console.log("Create New : "+ JSON.stringify(formData));
          await axios.post('https://localhost:7099/api/Employee/CreateEmployee', formData);
        } else {
          // Update existing employee
          console.log("Update : "+ JSON.stringify(formData));
          await axios.put(`https://localhost:7099/api/Employee/UpdateEmployee/${id}`, formData);
        }
        router.navigate({ to: `/employee/employee-list` });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleCancel = () => {
    //navigate('/employee');
    router.navigate({ to: `/employee` });   
  };

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p>{fetchError}</p>;

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
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
            />
              {errors.emailAddress && <p className="error-message">{errors.emailAddress}</p>}
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
              name="CafeId"
              value={formData.CafeId}
              onChange={handleChange}
              disabled={id !== 'create'}
            >
              <option value="">Select a café</option>
              {cafes.map(cafe => (
                <option key={cafe.id} value={cafe.id}>
                  {cafe.name}
                </option>
              ))}

            </select>
            {errors.CafeId && <p className="error-message">{errors.CafeId}</p>}
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
