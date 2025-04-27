const Notice = require('../model/notice.model.cjs')
const Category = require('../model/category.model.cjs')

const DEFAULT_CATEGORY = '680883bcaefeb26d002c79cc';

const editNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description, pin, categories } = req.body;

  const errors = {};

  if (!title.trim()) {
    errors.title = 'Title is required';
  }

  if (!description.trim()) {
    errors.description = 'Description is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  try {

    const existingNotice = await Notice.findById(id);
    if (!existingNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const categoriesFromBody = [...new Set(categories)]; //add categories from api body to newCategories const while checking for duplicates

    //to check if the categories from api exist in category collection
    for (const cat of categoriesFromBody) {
      const existing = await Category.findById(cat);
      if (!existing) {
        return res.status(404).json({ message: 'Invalid Category' });
      }
    }

    const catagoriesToRemove = existingNotice.categories.filter(item => !categoriesFromBody.includes(item));
    const catagoriesToAdd = categoriesFromBody.filter(item => !existingNotice.categories.includes(item));

    //loop to increment
    for (const cat of catagoriesToAdd) {
      await Category.findByIdAndUpdate(cat, { $inc: { counter: 1 } });
    }

    //loop to decrement
    for (const cat of catagoriesToRemove) {
      await Category.findByIdAndUpdate(cat, { $inc: { counter: -1 } });
    }
    
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, description, pin },
      { new: true, runValidators: true } // return updated document and validate schema
    );

    if (!updatedNotice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Notice updated successfully',
      data: updatedNotice,
    });
  } catch (error) {
    console.error('Edit notice error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const addNotice = async (req, res) => {
  const { title, description, pin, categories } = req.body;
  const errors = {};

  if (!title.trim()) {
    errors.title = 'Title is required';
  }

  if (!description.trim()) {
    errors.description = 'Description is required';
  }

  // if(!pin){
  //   pin = false
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  let categoryList = [...new Set(categories?.length ? categories : [DEFAULT_CATEGORY])];

  try {
    // Create new notice
    const dbResponseNotice = await Notice.create({
      title,
      description,
      pin,
      categories: categoryList,
    })
    
    if(dbResponseNotice._id) {
      for (const cat of categoryList) {
        await Category.findByIdAndUpdate(cat, { $inc: { counter: 1 } });
      }
    }

    res.status(201).json({
      message: 'Notice saved to MongoDB successfully',
      data: dbResponseNotice,
    });

    console.log('Saved Notice:', dbResponseNotice);
  } catch (err) {
    console.error('Error saving Notice:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Notice ID is required' });
    }

    const noticeByDb = await Notice.findById(id);
    if (noticeByDb) {
      for (const cat of noticeByDb.categories) {
        await Category.findByIdAndUpdate(cat, { $inc: { counter: -1 } });
      }
    }

    const deleted = await Notice.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice deleted successfully', data: deleted });
  } catch (err) {
    console.error('Error deleting Notice:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getNotices = async (req, res) => {
  try {
    const noticeData = await Notice.find().sort({ createdAt: 1 });

    if (noticeData.length === 0) {
      return res.status(404).json({ message: 'No notices found' });
    }

    return res.status(200).json({
      message: 'Notices retrieved successfully',
      data: noticeData,
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNoticesByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // const noticeData = await Notice.find({"categories": id }).sort({ createdAt: 1 });

    const noticeData = await Notice.find({ categories: id })
      .populate('categories')
      .sort({ createdAt: 1 });

    if (noticeData.length === 0) {
      return res.status(404).json({ message: 'No notices found' });
    }

    return res.status(200).json({
      message: 'Notices retrieved successfully',
      data: noticeData,
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { addNotice, deleteNotice, getNotices, editNotice, getNoticesByCategory };