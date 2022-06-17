import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/user`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      {users?.map((user) => (
        <div className="col-md-3 card me-3 mt-2 p-0 border border-light shadow p-3 mb-4 bg-body rounded" key={user._id}>
          <img src={user.avatar} alt="" width={"100%"} height={250} class="rounded" />
          <div className="">
         <div class="container">
           <br></br>
           <div class="row">
             <div class="col-md-6">
             <h5>Estudiante</h5>
         <p>{user.name}</p>
         <h5>Edad:</h5>
           <p>{user.age}</p>
             </div>
             <div class="col-md-6">
             <h5>Apellidos</h5>
           <p>{user.last_name}</p>
           <h5>Telefono</h5>
           <p>{user.number}</p>
             </div>
           </div>
           <h5>Direccion</h5>
           <p>{user.address}</p>
         </div>
          
           
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/edit/${user._id}`} style={{ textDecoration: "none" }}>
              <span class="material-symbols-outlined">
edit
</span>
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user._id)}
              >
               <span class="material-symbols-outlined">
delete
</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
