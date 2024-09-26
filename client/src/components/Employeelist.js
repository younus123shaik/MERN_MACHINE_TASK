import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Employeelist = () => {
    const [employeelist , setemployeelist] = useState([]);
    const [filteredList , setfilterdList] = useState([...employeelist])
    const [flag , setflag] = useState(false)
    const [sort , setSort] = useState("")
    const [searchWord , setsearchWord] = useState("")
    useEffect(() => {
      return async() => {
        const result = await axios.get('http://localhost:5000/employeelist/show');
        setemployeelist(result.data);
        setfilterdList(result.data)
      }
    }, [flag])
    useEffect(()=>{
            let arr = [...employeelist]
                arr.sort((a,b)=>{
                if (sort === 'name' || sort === 'email') {
                    return a[sort].localeCompare(b[sort])
                }
                else if (sort === 'created_date') {
                    return new Date(a[sort]) - new Date(b[sort])
                }
                else if (sort === 'uniqueid') {
                    return a[sort] - b[sort]
                }
            })
            setfilterdList(arr)
        
    },[sort])
    let nav = useNavigate();
    const handleDelete = async(uniqueid)=>{
        try {
            let res = await axios.delete(`http://localhost:5000/employeelist/delete/${uniqueid}`);
            alert("Employee Deleted Successfully.")
            setflag(!flag)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!searchWord) {
            return;
        }

        const filteredlist = employeelist.filter((employee) => {
            return (
                employee.name.toLowerCase().includes(searchWord.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchWord.toLowerCase()) ||
                employee.course.toLowerCase().includes(searchWord.toLowerCase()) ||
                employee.designation.toLowerCase().includes(searchWord.toLowerCase()) ||
                employee.gender.toLowerCase().includes(searchWord.toLowerCase())
            );
        });

        console.log(filteredlist);
        setfilterdList(filteredlist);
    }, [searchWord]);
    const handelChange = (e)=>{
        setsearchWord(e.target.value)
    }
  return (
    <div className="">
        <div className='secondhead'>
            <button onClick={()=>{nav("/createemployee")}}>Create Employee</button>
            <div className='searchbar'>
                <label>Search : </label>
                <input type='text'placeholder='Enter Search Keyword'className='search' onChange={handelChange} />
            </div>
            <p>Total Count : <span>{employeelist.length}</span></p>
        </div>
            <table className='table'>
                <thead>
                <tr className='table_heading'>
                    <th className='table_heading_data' onClick={()=>setSort("uniqueid")}>#Unique Id</th>
                    <th className='table_heading_data'>Image</th>
                    <th className='table_heading_data' onClick={()=>setSort("name")}>#Name</th>
                    <th className='table_heading_data' onClick={()=>setSort("email")}>#Email</th>
                    <th className='table_heading_data'>Mobile No.</th>
                    <th className='table_heading_data'>Designation</th>
                    <th className='table_heading_data'>gender</th>
                    <th className='table_heading_data'>Course</th>
                    <th className='table_heading_data' onClick={()=>setSort("created_date")}>#Create date</th>
                    <th className='table_heading_data'>Action</th>
                </tr>
                </thead>
                <tbody className='body'>
                {filteredList && filteredList.map((employee , index) => (
                    <tr data-testid="article" key={index+1}>
                    <td className='body_data'>{index+1}</td>
                    <td className='body_data'>
                                <img 
                                    src={`http://localhost:5000/${employee.image}`}
                                    alt='Employee'
                                    width ={50} height= {50}
                                />
                            </td>
                    <td className='body_data'>{employee.name}</td>
                    <td className='body_data'>{employee.email}</td>
                    <td className='body_data'>{employee.mobile}</td>
                    <td className='body_data'>{employee.designation}</td>
                    <td className='body_data'>{employee.gender}</td>
                    <td className='body_data'>{employee.course}</td>
                    <td className='body_data'>{employee.created_date}</td>
                    <td className='body_data'>
                        <div>
                            <button onClick={()=>{nav(`/editemployee/${employee.uniqueid}`)}}>Edit</button>
                            <button onClick={()=>handleDelete(employee.uniqueid)}>Del</button>
                        </div>
                    </td>

                </tr>
                ))}
                </tbody>
            </table>
        </div>
  )
}

export default Employeelist