// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import Formtable from './components/Formtable.js';
//import { MdClose } from "react-icons/md"
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    dept: "",
    position: "",
    salary: 0,
  });
  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    name: "",
    email: "",
    dept: "",
    position: "",
    salary: 0,
    _id: ""
  });

  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(data);
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)      
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])

  const handleDelete = async (ID) => {
    try {
      const data = await axios.delete(`/delete/${ID}`);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };
  const handleUpdate = async(e)=>{
    try {
      e.preventDefault()
      const data = await axios.put(`/update`, formDataEdit);
      if (data.data.success) {
        getFetchData(); 
        alert(data.data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  }
  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }
  

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
        {
          addSection && (
            <Formtable
              handleSubmit = {handleSubmit}
              handleOnChange = {handleOnChange}
              handleClose = {() => setAddSection(false)}
              rest = {formData}
            />
          )
        }
        {
          editSection && (
            <Formtable
              handleSubmit = {handleUpdate}
              handleOnChange = {handleEditOnChange}
              handleClose = {() => setEditSection(false)}
              rest = {formDataEdit}
            />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>
                  <button className='btn'>Edit</button>
                  <button className='btn'>Delete</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((el) => {
                    return (
                      <tr key={el._id}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.dept}</td>
                        <td>{el.position}</td>
                        <td>{el.salary}</td>
                        <td>
                          <button className='btn btn-edit' onClick={() => {
                            handleEdit(el)
                          }}>Edit</button>
                          <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No Data
                      </td>
                    </tr>
                  )
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;

