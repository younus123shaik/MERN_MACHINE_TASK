import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createemployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'hr',
        gender: '',
        course: [],
        image: null,
    });
    const nav = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            setEmployee(prevState => {
                const courses = prevState.course.includes(value)
                    ? prevState.course.filter(course => course !== value)
                    : [...prevState.course, value];
                return { ...prevState, course: courses };
            });
        } else if (name === 'image') {
            setEmployee(prevState => ({ ...prevState, image: e.target.files[0] }));
        } else {
            setEmployee(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(employee).forEach(key => {
            if (key === 'course') {
                employee.course.forEach(course => {
                    formData.append('course', course);
                    return
                });
            } else {
                formData.append(key, employee[key]);
            }
        });
        try {
            await axios.post('http://localhost:5000/employeelist/create', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee created successfully');
            setEmployee({
                name: '',
                email: '',
                mobile: '',
                designation: 'hr',
                gender: '',
                course: [],
                image: null,
            });
            nav('/employeelist')
        } catch (error) {
            console.log('Error creating employee', error);
            console.log(employee);
        }
    };

    return (
        <div className='create_employee'>
            <h2 className='title'>Create Employee</h2>
            <form className='employee' onSubmit={handleSubmit}>
                <div className='employee_data'>
                    <label>Name : </label>
                    <input type='text' name='name' value={employee.name} onChange={handleChange} required/>
                </div>
                <div className='employee_data'>
                    <label>Email : </label>
                    <input type='text' name='email' value={employee.email} onChange={handleChange} required />
                </div>
                <div className='employee_data'>
                    <label>Mobile No : </label>
                    <input type='text' name='mobile' value={employee.mobile} onChange={handleChange} required/>
                </div>
                <div className='employee_data'>
                    <label>Designation: </label>
                    <select name='designation' value={employee.designation} onChange={handleChange}>
                        <option value="hr">HR</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                    </select>
                </div>
                <div className='ratio employee_data' >
                    <label>Gender : </label>
                    <div>
                        <input type='radio' name='gender' value="male" checked={employee.gender === "male"} onChange={handleChange} />
                        <label>Male</label>
                    </div>
                    <div>
                        <input type='radio' name='gender' value="female" checked={employee.gender === "female"} onChange={handleChange} />
                        <label>Female</label>
                    </div>
                </div>
                <div className='employee_data'>
                    <label>Course : </label>
                    <div>
                        <input type='checkbox' name='course' value="MCA" onChange={handleChange} />
                        <label>MCA</label>
                    </div>
                    <div>
                        <input type='checkbox' name='course' value="BCA" onChange={handleChange} />
                        <label>BCA</label>
                    </div>
                    <div>
                        <input type='checkbox' name='course' value="BSC" onChange={handleChange} />
                        <label>BSC</label>
                    </div>
                </div>
                <div className='employee_data'>
                    <label>Img Upload : </label>
                    <input type='file' name='image' onChange={handleChange} />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
};

export default Createemployee;
