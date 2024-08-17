// middleware/validate.js

export const validateData = (schema) => (req, res, next) => {
    const errors = [];

    // Validate each field in the schema
    for (const [key, rules] of Object.entries(schema)) {
        const value = req.body[key];
        if (rules.required && (value === undefined || value === null || value === '')) {
            errors.push({ field: key, message: `${key} is required` });
        }

        if (rules.type && typeof value !== rules.type) {
            errors.push({ field: key, message: `${key} should be of type ${rules.type}` });
        }

        if (rules.minLength && value.length < rules.minLength) {
            errors.push({ field: key, message: `${key} should be at least ${rules.minLength} characters long` });
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            errors.push({ field: key, message: `${key} should be at most ${rules.maxLength} characters long` });
        }

        if (rules.regex && !rules.regex.test(value)) {
            errors.push({ field: key, message: `${key} is not in the correct format` });
        }
    }

    if (errors.length) {
        return res.status(400).json({ errors });
    }

    next();
};
