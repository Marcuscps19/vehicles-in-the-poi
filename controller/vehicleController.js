const vehicleServices = require('../service/vehicleServices');

const vehicleController = async (req, res, next) => {
    try {
        const response = await vehicleServices();
        return res.status(200).json({ message: 'ok'});
    } catch(error){
        console.log(error)
        return res.status(500).json({'message': error});
    }
}

module.exports = vehicleController;