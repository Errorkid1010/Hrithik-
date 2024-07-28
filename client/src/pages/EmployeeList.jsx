import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const nav = useNavigate();


  function CreateEmployee (){
    nav("CreateEmployee")
  }

  useEffect(() => {
    // Fetch employee data from the backend API
    axios
      .get('http://localhost:3001/getemployee')
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.employeename.toLowerCase().includes(term)
      )
    );
  };

  const Deleteemployee = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/deleteemployee/${_id}`);
      alert('Deleted successfully');
      // Update the employees list after deletion
      setEmployees(employees.filter((employee) => employee._id !== _id));
      setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== _id));
    } catch (error) {
      console.error('Error deleting:', error.message);
      alert('Server error');
    }
  };

  return (
    <div>
      <div className='heading'>
        <h2>Employee List</h2>
      </div>

      <div className='btn-primary'>
      <button onClick={CreateEmployee}Create Employee> Create Employee</button>
      </div>

      <div className='search-input'>
        <label>Search: </label>
        <input type='text' value={searchTerm} onChange={handleSearch} />
      </div>

      {filteredEmployees.length === 0 ? (
        <div className='container'>
          <h3 className='text-center'>No Records Found</h3>
          <br />
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Course</th>
                <th>Gender</th>
                <th>Creation Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.employeeId}</td>
                  <td>
                    <img
                      src={employee.employeeimagePath}
                      alt='Employee'
                      style={{ width: '100px' }}
                    />
                  </td>
                                <td>{employee.employeename}</td>
                                <td>{employee.employeephone}</td>
                                <td>{employee.employeeemail}</td>
                                <td>{employee.employeedesignation}</td>
                                <td>{employee.employeecourse}</td>
                                <td>{employee.employeegender}</td>
                                <td>{employee.employeecreatedate}</td>
                                <td>
                                    {employee._id ? (
                                    <>
                                   <Link to={`editemployee/${employee._id}`} className='btn btn-sm btn-warning mb-1'>Edit</Link><br/>
                                   </>
                                      

                                    ) : (
                                        <span className='btn btn-sm btn-disabled' disabled>Edit</span>
                                    )}
                                    <button className='btn btn-sm btn-danger' onClick={() => Deleteemployee(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className='total-count'>
        <label><b>Total Count: {filteredEmployees.length}</b></label>{' '}
        
      </div>
            </>)}
  </div>
  )
}

export default EmployeeList