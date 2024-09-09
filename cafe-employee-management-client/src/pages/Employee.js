import React, {useState} from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Box, Container, Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from '@tanstack/react-router';


const Employee = () => {


    const [openDialog, setOpenDialog] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const router = useRouter(); 

    const employees = [
        {
            id: 1,
            name: 'John Doe',
            gender: 'Male',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            daysWorked: 20,
            cafeName: 'Cafe Mocha'
        },
        {
            id: 2,
            name: 'Jane Smith',
            gender: 'Female',
            email: 'jane.smith@example.com',
            phone: '098-765-4321',
            daysWorked: 18,
            cafeName: 'Java House',
        },
        {
            id: 3,
            name: 'Mike Johnson',
            gender: 'Male',
            email: 'mike.johnson@example.com',
            phone: '555-123-4567',
            daysWorked: 15,
            cafeName: 'Espresso Express',
        }
    ];
    
    const handleEdit = (employee) => {
        console.log('Edit employee:', employee);
    };
    
    const handleDelete = (employeeId) => {
        console.log('Delete employee with ID:', employeeId);
        setEmployeeToDelete(employeeId);
        setOpenDialog(true);
    };
    
    const handleAddNewEmployee = () => {
        console.log('Add New Employee');
        router.navigate({ to: '/employee-form' });
            
    };

    const handleConfirmDelete = () => {
        console.log('Delete employee with ID:', employeeToDelete);
        setOpenDialog(false);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
        setEmployeeToDelete(null);
    };


    const columnDefs = [
        { headerName: 'Employee ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
        { headerName: 'Email Address', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone Number', field: 'phone', sortable: true, filter: true },
        { headerName: 'Days Worked', field: 'daysWorked', sortable: true, filter: true },
        { headerName: 'Café Name', field: 'cafeName', sortable: true, filter: true },
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
            <Typography variant="h4" gutterBottom>Employee Management</Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddNewEmployee}
              startIcon={<AddIcon></AddIcon>}
            >
              Add Employee
            </Button>
          </Box>
           
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    rowData={employees}
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
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}
                    variant="contained"
                    size="small"
                    color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete}
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

export default Employee;
