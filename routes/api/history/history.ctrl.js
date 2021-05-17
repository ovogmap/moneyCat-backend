const History = require('../../../models/History')

exports.create = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error('body is not defined')
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
    if (!writer) throw new Error('not found writer')

    let historyList = await History.find({ writer })

    if (month) {
      historyList = historyList.filter(f => f.writeDate.split('-')[1] === month)
      res.send({
        success: true,
        historyList,
        count: historyList.length,
      })
    } else {
      res.send({
        success: true,
        historyList,
        count: historyList.length,
      })
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    })
  }
}

exports.getSixMonths = async (req, res) => {
  try {
    const writer = req.params?.writer
    const month = req.query?.month
    const year = req.query?.year
    if (!writer) throw new Error('not found writer')

    const monthArray = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ]
    let historyList = await History.find({ writer })

    // month가 1월 ~ 5월이면 전년도 까지
    if (+month < 6) {
      let thisYearMonth = []
      let lastYearMonth = []
      for (let i = 0; i < monthArray.length; i++) {
        if (month === monthArray[i]) {
          thisYearMonth = monthArray.slice(0, i + 1)
          lastYearMonth = monthArray.slice(i + 1 - 6)
        }
      }

      const thisYearList = historyList.filter(history => {
        if (history.writeDate.split('-')[0] === year) {
          return thisYearMonth.filter(yearItem => {
            return history.writeDate.split('-')[1] === yearItem
          })
        }
      })

      const lastYearList = historyList.filter(history => {
        if (history.writeDate.split('-')[0] === String(+year - 1)) {
          return lastYearMonth.filter(yearItem => {
            return history.writeDate.split('-')[1] === yearItem
          })
        }
      })

      let sixMonthHistoryList = [...lastYearList, ...thisYearList]
      let 지출 = {}
      let 수입 = {}
      for (let i = 0; i < sixMonthHistoryList.length; i++) {
        if (sixMonthHistoryList[i].useType === '지출') {
          if (!지출[sixMonthHistoryList[i].writeDate.split('-')[1]]) {
            지출[sixMonthHistoryList[i].writeDate.split('-')[1]] =
              sixMonthHistoryList[i].pay
          } else {
            지출[sixMonthHistoryList[i].writeDate.split('-')[1]] +=
              sixMonthHistoryList[i].pay
          }
        } else {
          if (!수입[sixMonthHistoryList[i].writeDate.split('-')[1]]) {
            수입[sixMonthHistoryList[i].writeDate.split('-')[1]] =
              sixMonthHistoryList[i].pay
          } else {
            수입[sixMonthHistoryList[i].writeDate.split('-')[1]] +=
              sixMonthHistoryList[i].pay
          }
        }
      }
      console.log(지출)
      console.log(수입)

      sixMonthHistoryList = {
        지출개월: Object.keys(지출),
        지출금액: Object.values(지출),
        수입개월: Object.keys(수입),
        수입금액: Object.values(수입),
      }

      res.send({
        success: true,
        sixMonthHistoryList,
      })
    } else {
      let thisYearSixMonth = []
      for (let i = 0; i < monthArray.length; i++) {
        if (month === monthArray[i]) {
          thisYearSixMonth = monthArray.slice(0, i + 1)
        }
      }

      const thisYearList = historyList.filter(history => {
        if (history.writeDate.split('-')[0] === year) {
          return thisYearSixMonth.filter(yearItem => {
            return history.writeDate.split('-')[1] === yearItem
          })
        }
      })

      res.send({
        success: true,
        thisYearList,
        count: thisYearList.length,
      })
    }
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

    if (!_id) throw new Error('not found id')

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

    if (!_id) throw new Error('not found id')

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

    if (!_id) throw new Error('not found id')

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
