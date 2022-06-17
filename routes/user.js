const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/user");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Enviar imagen a cloduinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Crear nuevo estudiante
    let user = new User({
      last_name: req.body.last_name,
      age: req.body.age,
      address: req.body.address,
      name: req.body.name,
      number: req.body.number,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Guardar Usuario
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Encontrar estudiante por ID
    let user = await User.findById(req.params.id);
    // Eliminar imagen en cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Eliminar usuario por DB
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Eliminar imagen por cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Isertar imagen en cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      number: req.body.number || user.number,
      address: req.body.address || user.address,
      age: req.body.age|| user.age,
      last_name: req.body.last_name || user.last_name,
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    //Encontra estduiante y actualizarlo llamandolo mediante su ID y la data que contiene la constante DATA
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Encontra usuario por ID
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
