const History = require("../../../models/History")

exports.create = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error("body is not defiend")
    // if (!req.body.write) throw new Error("body is not defiend")

    const history = new History(req.body)

    history.save()

    res.send({
      success: true,
      history,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

exports.get = async (req, res) => {
  try {
    const write = req.params?.write
    if (!write) throw new Error("not found write")
    const historyList = await History.find().populate(write).exec()
    res.send({
      success: true,
      historyList,
      count: historyList.length,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

exports.getDetail = async (req, res) => {
  try {
    const _id = req.params?.id

    if (!_id) throw new Error("not found id")

    const historyOne = await History.findOne({ _id })

    res.send({
      success: true,
      historyOne,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const _id = req.body.id

    if (!_id) throw new Error("not found id")

    const deleteItem = await History.findOne({ _id })

    deleteItem.remove()

    res.send({
      success: true,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

exports.update = async (req, res) => {
  try {
    const _id = req.body._id

    await History.findOneAndUpdate({ _id }, req.body)

    res.send({
      success: true,
    })
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}
