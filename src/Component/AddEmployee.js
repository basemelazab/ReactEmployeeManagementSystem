import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {

    const[id,setID]=useState("");
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState("");
    const[department,setDepartment]=useState("IT");
    const[active,setActive]=useState(true);
    const[validation,setValidation]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={name,email,phone,department,active};
      

      fetch("http://localhost:5000/employee",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Created successfully.')
        navigate('/employee');
      }).catch((err)=>{
        console.log(err.message)
      })

    }


    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Create Employee</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e=>setValidation(true)} onChange={e=>setName(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input required value={email} onMouseDown={e=>setValidation(true)}  onChange={e=>setEmail(e.target.value)} className="form-control"></input>
                                            {email.length==0 && validation && <span className="text-danger">Enter the Email</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input required value={phone} onMouseDown={e=>setValidation(true)}  onChange={e=>setPhone(e.target.value)} className="form-control"></input>
                                            {phone.length==0 && validation && <span className="text-danger">Enter the Phone</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Department</label>
                                        <select value={department} onChange={e => setDepartment(e.target.value)} className="form-control">
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                            <option value="HR">HR</option>
                                        </select>
                                    </div>
                                </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                        <input checked={active} onChange={e=>setActive(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label  className="form-check-label">Is Active</label>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Add</button>
                                           <Link to="/employee" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddEmployee;