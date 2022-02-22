const vehicleServices = require('../service/vehicleServices');

const vehicleController = async (req, res, next) => {
    const { datetime, plate } = req.body;
    try {
        const response = await vehicleServices(datetime, plate);
        return res.status(200).json({ response });
    } catch(error){
        console.log(error)
        return res.status(500).json({'message': error});
    }
}

module.exports = vehicleController;