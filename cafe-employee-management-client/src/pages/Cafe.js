import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Box, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from '@tanstack/react-router';

const Cafe = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);
  const [ setCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCafes();
  }, []);

  const cafes = [
    {
        id: 1,
        logo: 'https://example.com/logo1.png', // Replace with actual logo URLs or paths
        name: 'Cafe Mocha',
        description: 'A cozy cafe offering a variety of coffee blends and pastries.',
        employees: 12,
        location: 'Downtown'
    },
    {
        id: 2,
        logo: 'https://example.com/logo2.png',
        name: 'Java House',
        description: 'Known for its strong brews and quiet atmosphere, perfect for work.',
        employees: 8,
        location: 'Uptown'
    },
    {
        id: 3,
        logo: 'https://example.com/logo3.png',
        name: 'Espresso Express',
        description: 'Fast service and excellent espresso, ideal for those on the go.',
        employees: 10,
        location: 'Midtown'
    },
    {
        id: 4,
        logo: 'https://example.com/logo4.png',
        name: 'Brew & Beans',
        description: 'A hip cafe with live music and a wide selection of organic coffees.',
        employees: 15,
        location: 'Suburb'
    },
    {
        id: 5,
        logo: 'https://example.com/logo5.png',
        name: 'Latte Lounge',
        description: 'A modern cafe with a great selection of lattes and desserts.',
        employees: 20,
        location: 'City Center'
    }
];


  const fetchCafes = async () => {
    try {
      const response = await fetch('/cafes'); 
      const data = await response.json();
      setCafes(data);
    } catch (error) {
      console.error('Failed to fetch cafes:', error);
    }
  };

  const handleEdit = (cafe) => {
    console.log('Edit cafe:', cafe);
  };

  const handleDelete = (cafeId) => {
    console.log('Delete cafe with ID:', cafeId);
    setCafeToDelete(cafeId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log('Confirmed delete for cafe ID:', cafeToDelete);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setCafeToDelete(null);
  };

  const handleAddNewCafe = () => {
    console.log('Add New Cafe');
    router.navigate({ to: '/cafe-form' });
  };

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleViewEmployees = (cafe) => {
    // Navigate to the employees page of the selected cafe
    router.navigate({ to: `/cafes/${cafe.id}/employees` });
  };

  // Filter cafes by location
  const filteredCafes = cafes.filter((cafe) => 
    locationFilter === '' || cafe.location.includes(locationFilter)
  );

  const columnDefs = [
    { headerName: 'Logo', field: 'logo', cellRenderer: (params) => <img src={params.value} alt="Logo" style={{ width: '50px' }} /> },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { 
      headerName: 'Employees', 
      field: 'employees', 
      cellRenderer: (params) => (
        <Button variant="contained" size="small" onClick={() => handleViewEmployees(params.data)}>
          View Employees
        </Button>
      ),
    },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <Box>
          <Button 
            variant="contained" 
            size="small"
            color="secondary" 
            onClick={() => handleEdit(params.data)}>
            Edit
          </Button>
          <Button 
            variant="contained" 
            size="small"
            color="error" 
            onClick={() => handleDelete(params.data.id)}
            style={{ marginLeft: '8px' }}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Café Management</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddNewCafe}
          startIcon={<AddIcon />}
        >
          Add New Café
        </Button>
        <FormControl variant="outlined" size="small" style={{ width: '200px' }}>
          <InputLabel>Filter by Location</InputLabel>
          <Select
            value={locationFilter}
            onChange={handleLocationFilterChange}
            label="Filter by Location"
          >
            <MenuItem value="">All Locations</MenuItem>
            {[...new Set(cafes.map(cafe => cafe.location))].map(location => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={filteredCafes}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this café?
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCancelDelete}
            variant="contained"
            size="small"
            color="error">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            size="small"
            color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cafe;
