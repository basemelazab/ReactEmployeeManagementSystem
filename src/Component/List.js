import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeList = () => {
    const [empdata, empdatachange] = useState(null);

    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
        GetUserAccess();
    }, []);

    const loadEmployees = () => {
        fetch("http://localhost:5000/employee").then((res) => {
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
                console.log(err.message);
        });      
    }

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:5000/roleaccess?role=" + userrole + "&menu=employee").then(res => {
            if (!res.ok) {
                navigate('/');
            toast.warning('You are not authorized to access');
                return false;
            }
            return res.json();
        }).then(res => {
            console.log(res);
            if (res.length > 0) {
                viewchange(true);
                let userobj = res[0];
                editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.havedelete);
            }else{
                navigate('/');
            toast.warning('You are not authorized to access');
            }
        })
    }


    const Removefunction = (id) => {
        if (window.confirm('Do you want to delete?')) {
            fetch("http://localhost:5000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Deleted successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const handleRemove = (id) => {
        if(haveremove){
        Removefunction(id);
        }else{
            toast.warning('You are not having access for remove');
        }
    }
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }

    const handleEdit = (id) => {
        if(haveedit){
            LoadEdit(id);
        }
        else{
            toast.warning('You are not having access for Edit');
        }
    }

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }


    const handleDetails = (id) => {
        if(haveedit){
            LoadDetail(id);
        }
        else{
            toast.warning('You are not having access to get Details');
        }
    }

    const handleadd = () => {
        if(haveadd){
        navigate("employee/create");
        }else{
            toast.warning('You are not having access for add');
        }
    }
    
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee List</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <button onClick={() => {handleadd()}}  className="btn btn-success">Add New (+)</button>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Deparment</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.department}</td>
                                        <td><a onClick={() => { handleEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() =>{ handleRemove(item.id) }} className="btn btn-danger">Delete</a>
                                            <a onClick={() => { handleDetails(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;