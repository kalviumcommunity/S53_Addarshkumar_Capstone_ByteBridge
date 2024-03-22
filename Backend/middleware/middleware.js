const userValidator = require("../validator/uservalidation");
const blogValidator = require("../validator/blogvalidator");

const uservalidation = async (req, res, next) => {
    try {
        const { error } = await userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const blogValidation = async (req, res, next) => {
    try {
        const { error } = await blogValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { uservalidation, blogValidation };
