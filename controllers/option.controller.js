const Form = require("../models/form.model");
const Option = require("../models/option.question.model")

const create = async (req, res) => {
    const { optionObj } = req.body;
    try {
        
        let option = await Option.create(optionObj);
        const optionId = option._id;
        var updateObj = {
            $addToSet: { options: optionId },
        };

        const form = await Form.findByIdAndUpdate(optionObj?.form, updateObj, { new: true })
            .populate({
                path: 'user',
                select: '_id name email'
            })
            .populate({
                path: 'options',
                //  populate: {
                //     path: 'options',
                //     model: 'Option'
                // }
            })
            .populate({
                path: 'options',
                // populate: {
                //     path: 'optionCols',
                //     model: 'Option'
                // }
            })
        res.status(200).json(form);
        // }
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}


const update = async (req, res) => {
    const { optionObj } = req.body;
    try {
        let option = await Option.findByIdAndUpdate(optionObj?._id, optionObj, { new: true })
        res.status(200).json(option);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
}



const deleteOption = async (req, res) => {
    const { optionId } = req.body;
    try {
        let option = await option.findByIdAndDelete(optionId);
        var updateObj = {
            $pull: { options: optionId },
        };

        const form = await Form.findByIdAndUpdate(option?.form, updateObj, { new: true })
            .populate({
                path: 'user',
                select: '_id name email'
            })
            .populate({
                path: 'options',
                //  populate: {
                //     path: 'options',
                //     model: 'Option'
                // }
            })
            .populate({
                path: 'options',
                // populate: {
                //     path: 'optionCols',
                //     model: 'Option'
                // }
            })
        res.status(200).json(form);

    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }

}
module.exports = {
    create,
    update,
    deleteOption
}