import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmployeeDetails = () => {
    const { empid } = useParams();

    const [empdata, setEmpdata] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpdata(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    
    return (
        <div>
            <div className="container">
                
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="card-body"></div>

                    {empdata &&
                        <div>
                            <h2>The Employee name is : <b>{empdata.name}</b>  ({empdata.id})</h2>
                            <h3>Employee Details</h3>
                            <h5>Email is : {empdata.email}</h5>
                            <h5>Phone is : {empdata.phone}</h5>
                            <h5>Department is : {empdata.department}</h5>
                            <Link className="btn btn-danger" to="/employee">Back to List</Link>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default EmployeeDetails;