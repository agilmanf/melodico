const Transactions = require("../models/transactions.models");

const getAllTransaction = async (req, res) => {
  try {
    const data = await Transactions.find({}, "-__v")
      .populate("userID", "purchaseDate")
    res.json({
      msg: "sukses ambil Data Transaksi",
      err: null,
      data,
    });
  } catch (error) {
    console.log(error), res.status(500).send(error);
  }
};

const getTransactionById = async (req, res) => {
  try {
    const data = await Transactions.findById(req.params.id).populate(
  "userID", "purchaseDate"
    );

    res.json({
      msg: "sukses ambil data transaksi by ID",
      err: null,
      data,
    });
  } catch (error) {
    console.log(error), res.status(500).send(error);
  }
};

const addTransaction = async (req, res) => {
  const data = new Transactions(req.body);

  data
    .save()
    .then((data) => {
      res.json({
        msg: "tambah data transaksi sukses",
        err: null,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        msg: "gagal tambah data",
        err,
        data: null,
      });
    });
};

const updateTransactionById = async (req, res) => {
  try {
    await Transactions.updateOne(
      { _id: req.params.id },
      { purchaseDate: req.body.status },
    ),
      res.json({
        message: "Data transaksi sudah diupdate",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteTransactionById = async (req, res) => {
  const data = await Transactions.findById(req.params.id).catch((err) => err);
  console.log(data);
  Transactions.deleteOne({ _id: req.params.id })
    .then(() => {
      if (data === null)
        return res.status(404).json({
          msg: "hapus data gagal",
          err: "data sudah dihapus",
          data,
        });

      res.json({
        msg: "sukses menghapus data transaksi",
        err: null,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
      res.json({
        msg: "gagal menghapus data",
        err,
        data: null,
      });
    });
};

module.exports = {
 getAllTransaction,
 getTransactionById,
 addTransaction,
 updateTransactionById,
 deleteTransactionById,
};