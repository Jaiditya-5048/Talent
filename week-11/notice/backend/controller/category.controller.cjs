const Category = require('../model/category.model.cjs')

const addCategory = async (req,res) => {
  const {category} = req.body;

  if (category.length === 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: { category : "invalid category"},
    });
  }

  try {
    const dbResponse = await Category.create({
      category
    });

    res.status(201).json({
      message: 'Category saved to MongoDB successfully',
      data: dbResponse,
    });

    console.log('Saved Category:', dbResponse);
  } catch (err) {
    console.error('Error saving Category:', err);
    res.status(500).json({ message: 'Server error' });
  }

}

const getCategory = async (req, res) => {
  try {
    const categoryData = await Category.find().sort({ category: 1 });


    if (categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    return res.status(200).json({
      message: 'categories retrieved successfully',
      data: categoryData,
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    if (id === "680883bcaefeb26d002c79cc") {
      return res.status(403).json({ message: 'Cannot delete base category' });
    }

    const category = await Category.findById(id);
    if(category.counter !== 0 ) {
      return res.status(409).json({ message: 'Cannot delete category with valid notices' });
    } else{
      const deleted = await Category.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully', data: deleted });
    }
  } catch (err) {
    console.error('Error deleting Category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addCategory, getCategory, deleteCategory };