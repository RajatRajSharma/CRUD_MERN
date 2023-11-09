import React from "react";
import '../App.css';
import { MdClose } from "react-icons/md"

const Formtable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
    return(
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose} ><MdClose /></div>

                <label htmlFor="id">Employee ID :</label>
                <input type="number" id="id" name="id" onChange={handleOnChange} value={rest.id} />

                <label htmlFor="name">Employee Name :</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name} />

                <label htmlFor="email">Employee Email :</label>
                <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email} />

                <label htmlFor="dept">Employee Department :</label>
                <input type="text" id="dept" name="dept" onChange={handleOnChange} value={rest.dept} />

                <label htmlFor="position">Employee Designation :</label>
                <input type="text" id="position" name="position" onChange={handleOnChange} value={rest.position} />

                <label htmlFor="salary">Employee Salary :</label>
                <input type="number" id="salary" name="salary" onChange={handleOnChange} value={rest.salary} />

                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Formtable;