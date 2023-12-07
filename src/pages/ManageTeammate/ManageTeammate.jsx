import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";


function ManageTeammate() {


    const data = useLoaderData();

    const [teammates, setTeammates] = useState(data)
    useEffect(() => {
        fetch('http://localhost:3000/all-teammate').then(res => res.json())
            .then(data => setTeammates(data));
              
    }, [])


    function handleDelete(teammateId) {
        fetch(`http://localhost:3000/delete-teammate/${teammateId}`, {
            method: "DELETE",
        }) 
            .then(res => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    const RestTeammates = teammates?.filter(teammate => teammate._id != teammateId)
                    setTeammates(RestTeammates)

                }
            });

    }










    return (
        <div className="my-0">
            <Navbar/>
            <div className="mx-auto max-w-7xl">
            <div className="overflow-x-auto m-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {teammates?.map(teammate => (

                            <tr key={teammate._id}>

                                <td>{teammate.name}</td>
                                <td>{teammate.email}</td>
                                <td>{teammate.position}

                                </td>

                                <td>


                                    <button className="btn" onClick={() =>
                                        handleDelete(teammate._id)}>Delete</button>
                                        

                                    <Link to={`/teammate/${teammate._id}`}>
                                        <button className="btn mx-3">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default ManageTeammate
