const mongoose = require("mongoose");
const Users = require("../models/Users");
const ObjectId = mongoose.Types.ObjectId;
const getAllUser = async (req, res) => {
  const all = await Users.find();
  res.json(all);
};

const createNewUser = async (req, res) => {
  const { name, email, status } = req.body;
  if (!name || !email || !status) {
    return res.status(400).json({ message: "Required details are missing" });
  }

  const duplicate = await Users.findOne({
    email: email,
  }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "user alredy exist" });
  }

  try {
    const result = await Users.create({
      name: name,
      email: email,
      status: status,
      date: new Date("2023-03-12T23:39:42.439Z"),
    });

    res.status(201).json({ success: `New User ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, status, _id } = req.body;

  if (!name || !email || !status || !_id) {
    return res.status(400).json({ message: "Required details are missing" });
  }

  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: ObjectId(_id),
      },
      {
        name: name,
        status: status,
      }
    );

    if (result) {
      res.status(201).json({ success: `User ${email} updated!` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id, email } = req.body;
  if (!_id) {
    return res.status(400).json({ message: "id is missing" });
  }
  try {
    const result = await Users.findOneAndDelete({
      _id: ObjectId(_id),
    });
    if (result) {
      res.status(201).json({ success: `User ${email} deleted!` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User id is missing" });
  }
  try {
    const result = await Users.findOne({
      _id: ObjectId(id),
    });
    if (result) {
      res.status(201).json(result);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const add_opportunity = async (req, res) => {
  const { _id, opportunity, status } = req.body;
  if (!_id || !opportunity || !status) {
    return res.status(400).json({ message: "Required details are missing" });
  }

  const duplicate = await Users.findOne({
    _id: ObjectId(_id),
    "opportunities.opportunity": opportunity,
  }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Opportunity alredy added" });
  }

  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: ObjectId(_id),
      },
      { $addToSet: { opportunities: { opportunity, status } } }
    );

    if (result) {
      res.status(201).json({ success: `Opportunity added to User!` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_opportunity = async (req, res) => {
  const { id, opportunity } = req.body;
  if (!id || !opportunity) {
    return res.status(400).json({ message: "Required details are missing" });
  }

  const duplicate = await Users.findOne({
    _id: ObjectId(id),
    "opportunities.opportunity": opportunity,
  }).exec();
  if (!duplicate) {
    return res.status(409).json({ message: "opportunity not found" });
  }

  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      { $pull: { opportunities: { opportunity: opportunity } } },
      { safe: true, multi: false }
    );

    if (result) {
      res.status(201).json({ success: `Opportunity removed from User!` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update_opportunity = async (req, res) => {
  const { id, opportunity, status } = req.body.data;

  if (!id || !opportunity || !status) {
    return res.status(400).json({ message: "Required details are missing" });
  }

  const duplicate = await Users.findOne({
    _id: ObjectId(id),
    "opportunities.opportunity": opportunity,
  }).exec();
  if (!duplicate) {
    return res.status(409).json({ message: "opportunity not found" });
  }

  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: ObjectId(id),
        "opportunities.opportunity": opportunity,
      },
      { $set: { "opportunities.$.status": status } },
      { safe: true, multi: false }
    );

    if (result) {
      res
        .status(201)
        .json({ success: `Opportunity status updates to ${status}!` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
  add_opportunity,
  update_opportunity,
  delete_opportunity,
};
