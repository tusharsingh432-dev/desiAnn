const Recipie = require("../models/recipeModel")

exports.getAll = async (req, res, next) => {
    try {
        const allRecipes = await Recipie.find({});
        res.status(200).json(allRecipes);
    } catch (err) {
        res.status(500).json({
            status: `Failed`,
            err
        });
    }
}

exports.addRecipe = async (req, res, next) => {
    const { name, addedBy } = req.body;

    try {
        const newRecipe = await Recipie.create({
            name: name,
            addedBy: addedBy
        });

        res.status(200).json({
            status: `success`,
            newRecipe
        })

    } catch (err) {
        res.status(500).json({
            status: `Failed`,
            err
        });
    }
}

exports.getRecipeById = async (req, res, next) => {
    try {
        const recipie = await Recipie.findById(req.params.id);

        if (!recipie) {
            res.status(404).json({
                status: `Failed`,
                message: 'Recipie dosent exist'
            });
        }
        res.status(200).json({
            status: `success`,
            data: {
                recipie
            }
        })
    } catch (error) {
        res.status(500).json({
            status: `Failed`,
            error
        });
    }
}

exports.patchRecipe = async (req, res, next) => {
    try {
        const recipie = await Recipie.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });

        if (!recipie) {
            res.status(404).json({
                status: `Failed`,
                message: 'Recipie dosent exist'
            });
        }

        res.status(200).json({
            status: `success`,
            data: {
                recipie
            }
        })
    } catch (error) {
        res.status(500).json({
            status: `Failed`,
            error
        });
    }
}

exports.deleteRecipie = async (req, res, next) => {
    try {

        const recipie = await Recipie.findByIdAndDelete(req.params.id);
        if (!recipie) {
            res.status(404).json({
                status: `Failed`,
                message: 'Recipie dosent exist'
            });
        }

        res.status(204).json({
            status: `success`,
        })

    } catch (error) {
        res.status(500).json({
            status: `Failed`,
            error
        });
    }
}

exports.addReview = async (req, res, next) => {
    try {

        const recipie = await Recipie.findById(req.params.id);

        if (!recipie) {
            res.status(404).json({
                status: `Failed`,
                message: 'Recipie dosent exist'
            });
        }

        let reviews = recipie.reviews;
        reviews.unshift(req.body);
        recipie.reviews = reviews;
        recipie.save();

    } catch (error) {
        res.status(500).json({
            status: `Failed`,
            error
        });
    }
}