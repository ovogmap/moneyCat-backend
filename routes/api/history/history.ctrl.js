const History = require("../../../models/History")

exports.create = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error("body is not defined")
    // if (!req.body.write) throw new Error("body is not defined")

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
    const writer = req.params?.writer
    const month = req.query?.month
    if (!writer) throw new Error("not found writer")

    let historyList = await History.find({ writer })

    if (month) {
      historyList = historyList.filter(
        (f) => f.writeDate.split("-")[1] === month
      )
      res.send({
        success: true,
        historyList,
        count: historyList.length,
      })
    }

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
    const _id = req.body._id

    if (!_id) throw new Error("not found id")

    await History.deleteOne({ _id })

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

    if (!_id) throw new Error("not found id")

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
