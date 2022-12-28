const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// inserted a photo, with an user related

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // if photo was created successfully
  if (!newPhoto) {
    res.status(402).json({
      errors: ["Houve um problema, tente novamente mais tarde"],
    });
    return;
    // quando gera um erro é bom retornar para parar a execuçã
  }

  res.status(201).json(newPhoto);
};

//Remove Photo From DB
const deletePhoto = async (req, res) => {
  //
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto Não Encontrada"] });
      return;
    }

    //check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde"],
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluida com sucesso!" });
  } catch (error) {
    res.status(404).json({ errors: ["Foto Não Encontrada"] });
    return;
  }
};

// Get All Photos

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    // no caso -1 seriam os mais novos (ou os ultimos)
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get User Photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get Photo by Id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  // check check if photo existis

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: [`Foto Id ${id} não encontrada`] });
      return;
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Por Favor Insira um ID Válido"] });
  }
};

//Update a Photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    //check if photo exists

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    // check if photo belongs to user

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde"],
      });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json({ photo, message: "Foto Atualizada com sucesso." });
  } catch (error) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde"],
    });
  }
};

// LIKE FUNCTIONALITY
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  // check if photo existis
  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: [`Foto Id ${id} não encontrada`] });
      return;
    }

    //check if user already liked the photo

    if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({ errors: ["você já curtiu a foto"] });
      return;
    }

    //Put user ID in likes array

    photo.likes.push(reqUser._id);

    photo.save();
    res
      .status(200)
      .json({ photo: id, userId: reqUser._id, message: " A foto Foi Curtida" });
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["Ocorreu algum erro, tente novamente mais tarde."] });
  }
};

//Dislike photo
const dislikePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  // check if photo existis
  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: [`Foto Id ${id} não encontrada`] });
      return;
    }

    //check if user already liked the photo

    if (!photo.likes.includes(reqUser._id)) {
      res.status(422).json({
        errors: ["Você não curtiu essa foto"],
      });
      return;
    }

    //Put user ID in likes array

    photo.likes.pop(reqUser._id);

    photo.save();
    res.status(200).json({
      photo: id,
      userId: reqUser._id,
      message: "Você descurtiu essa foto",
    });
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["Ocorreu algum erro, tente novamente mais tarde."] });
  }
};

// comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(id);

    // check if photo exists

    if (!photo) {
      res.status(404).json({ errors: ["Foto Não Encontrada"] });
      return;
    }

    //put comments in the array comments

    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user.id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "o comentário foi adicionado com sucesso",
    });
  } catch (error) {
    res
      .status(404)
      .json({ errors: ["Ocorreu algum erro, tente novamente mais tarde"] });
  }
};

//search photos by title

const SearchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({
    title: new RegExp(q, "i"),
  }).exec(); /* exec = executar a query */

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  dislikePhoto,
  commentPhoto,
  SearchPhotos,
};
