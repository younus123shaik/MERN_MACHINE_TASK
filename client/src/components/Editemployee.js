import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editemployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
        existingImage: '' // To store the current image URL
    });
    const { uniqueid } = useParams();
    const nav = useNavigate();

    // Fetch employee data
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/employeelist/get/${uniqueid}`);
                const data = res.data[0];
                setEmployee({
                    ...data,
                    course: data.course.split(','), // Convert course string back to array
                    existingImage: data.image // Store the existing image
                });
                console.log(employee);
            } catch (error) {
                console.log("Employee not found");
            }
        };
        fetchEmployee();
    }, [uniqueid]);

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'course') {
            const updatedCourses = checked
                ? [...employee.course, value]
                : employee.course.filter((course) => course !== value);
            setEmployee(prevState => ({ ...prevState, course: updatedCourses }));
        } else if (name === 'image') {
            setEmployee(prevState => ({ ...prevState, image: e.target.files[0] }));
        } else {
            setEmployee(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        employee.course.forEach(course => formData.append('course', course));

        if (employee.image) {
            formData.append('image', employee.image);
        }
        console.log(formData.get("image"));
        try {
            await axios.put(`http://localhost:5000/employeelist/update/${uniqueid}`, formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Employee updated successfully");
            setTimeout(() => {
                nav("/employeelist");
            }, 1000);
        } catch (error) {
            console.log("Error updating employee", error);
        }
    };

    return (
        <div className='create_employee'>
            <h2 className='title'>Employee Edit</h2>
            <form className='employee' onSubmit={handleUpdate}>
                <div className='employee_data'>
                    <label>Name : </label>
                    <input type='text' name='name' value={employee.name} onChange={handleChange} required />
                </div>
                <div className='employee_data'>
                    <label>Email : </label>
                    <input type='text' name='email' value={employee.email} onChange={handleChange} required />
                </div>
                <div className='employee_data'>
                    <label>Mobile No : </label>
                    <input type='text' name='mobile' value={employee.mobile} onChange={handleChange} required />
                </div>
                <div className='employee_data'>
                    <label>Designation: </label>
                    <select name='designation' value={employee.designation.toLowerCase()} onChange={handleChange}>
                        <option value="hr">HR</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                    </select>
                </div>
                <div className='ratio employee_data'>
                    <label>Gender : </label>
                    <div>
                        <input type='radio' name='gender' value="male" checked={employee.gender.toLowerCase() === "male"} onChange={handleChange} />
                        <label>Male</label>
                    </div>
                    <div>
                        <input type='radio' name='gender' value="female" checked={employee.gender.toLowerCase() === "female"} onChange={handleChange} />
                        <label>Female</label>
                    </div>
                </div>
                <div className='employee_data'>
                    <label>Course : </label>
                    <div>
                        <input type='checkbox' name='course' value="MCA" checked={employee.course.includes('MCA')} onChange={handleChange} />
                        <label>MCA</label>
                    </div>
                    <div>
                        <input type='checkbox' name='course' value="BCA" checked={employee.course.includes('BCA')} onChange={handleChange} />
                        <label>BCA</label>
                    </div>
                    <div>
                        <input type='checkbox' name='course' value="BSC" checked={employee.course.includes('BSC')} onChange={handleChange} />
                        <label>BSC</label>
                    </div>
                </div>
                <div className='employee_data'>
                    <label>Current Image : </label>
                    {employee.existingImage && (
                        <div>
                            <img src={`http://localhost:5000/${employee.existingImage}`} alt='Employee' style={{ width: '100px', height: '100px' }} />
                        </div>
                    )}
                </div>
                <div className='employee_data'>
                    <label>Upload New Image : </label>
                    <input type='file' name='image' onChange={handleChange} />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    );
};

export default Editemployee;
