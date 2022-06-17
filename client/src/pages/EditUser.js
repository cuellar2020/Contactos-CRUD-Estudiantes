import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditUser = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    number: "",
    address: "",
    age: "",
    last_name: "",
    name: "",
    image: "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/user/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("last_name", data.last_name);
      formData.append("address", data.address);
      formData.append("age", data.age);
      formData.append("number", data.number);

      const res = await fetch(`http://localhost:5000/user/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "",last_name: "",address: "",age: "",number: "", image: "" });
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="">
      <div class="row">
        
        <div class="col-md-12">
          <h2 class="text-center"> Actualizar Datos del Estudiante</h2>
          <br></br>
        <div style={{ maxWidth: 600, margin: "auto" }}>
      <div className="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Nombre</label>
        <input
          className="form-control"
          
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
        <br></br>
        <label for="exampleFormControlInput1" class="form-label">Apellido</label>
        <input
          className="form-control"
          placeholder=""
          type="text"
          name="last_name"
          value={data.last_name}
          onChange={handleChange("last_name")}
        />
        <br></br>
        <label for="exampleFormControlInput1" class="form-label">Edad</label>
        <input
          className="form-control"
          placeholder=""
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange("age")}
        />
        <br></br>
        <label for="exampleFormControlInput1" class="form-label">Direccion</label>
        <input
          className="form-control"
          placeholder=""
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange("address")}
        />
        <br></br>
        <label for="exampleFormControlInput1" class="form-label">Telefono</label>
        <input
          className="form-control"
          placeholder=""
          type="number"
          name="number"
          value={data.number}
          onChange={handleChange("number")}
        />
        <br></br>
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange("image")}
        />
        <br></br>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>

        </div>

      </div>

    </div>
  );
};

export default EditUser;
