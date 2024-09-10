import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CircularProgress, Button, Box, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from '@tanstack/react-router';
import { useCafes } from "../hooks/useCafes";
import axios from 'axios';


const Cafe = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');

  const { data: fetchedCafes = [], isLoading, isError } = useCafes();
  const router = useRouter();

  useEffect(() => {
    setCafes(fetchedCafes);
  }, [fetchedCafes]);

  /*const cafes = [
    {
        id: 1,
        logo: 'https://example.com/logo1.png', // Replace with actual logo URLs or paths
        name: 'Cafe Mocha',
        description: 'A cozy cafe offering a variety of coffee blends and pastries.',
        employees: '12',
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
];*/



  const handleEdit = (cafe) => {
    console.log('Edit cafe:', cafe);
    router.navigate({ to: `/cafe-form/${cafe.id}` });   
  };

  const handleDelete = (cafeId) => {
    console.log('Delete cafe with ID:', cafeId);
    setCafeToDelete(cafeId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
        console.log('Delete Cafe with ID:', cafeToDelete);
        await axios.delete(`https://localhost:7099/api/Cafes/DeleteCafe/${cafeToDelete}`);
        setCafes(cafes.filter(cafe => cafe.id !== cafeToDelete));
        setOpenDialog(false);
        console.log(`Cafe with ID: ${cafeToDelete} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting Cafe:', error);
        
    }
};

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setCafeToDelete(null);
  };

  const handleAddNewCafe = () => {
    console.log('Add New Cafe');
    router.navigate({ to: '/cafe-form/create' });
  };

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleViewEmployees = (cafe) => {
    router.navigate({ to: `/cafes/${cafe.id}/employees` });
  };

  const handleBack = () => {
    router.navigate({ to: '/' });
  };


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
      cellRenderer: (params) => {
        //console.log("Check data : ---> "+ JSON.stringify(params.data));
        const employeeFieldValue = params.data && params.data.employees ? params.data.employees : 'No Data';
        const employeeListUrl = `/employee/`+  params.data.id;

        return (
          <a href={employeeListUrl} target="_blank" rel="noopener noreferrer">
            {employeeFieldValue}
          </a>
        );
      }
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

  if (isLoading) return <CircularProgress />; 
  if (isError) return <Typography color="error">Error fetching data</Typography>;

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

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%',marginBottom: '20px'}}>
        <AgGridReact
          rowData={filteredCafes}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      <button type="button" onClick={handleBack} className="button button-submit">
              ~ Back to Welcome Page
      </button>

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
