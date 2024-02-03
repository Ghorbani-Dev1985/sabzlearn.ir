const notificationModel = require("../../models/notification");

exports.see = async (req, res) => {
  const updateNotification = await notificationModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      see: 1,
    }
  );

  return res.json(updateNotification);
};
