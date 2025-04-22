const Notice = require('../model/notice.model.cjs')

const addNotice = async (req, res) => {
  const { title, description, pin } = req.body;
  const errors = {};

  if (!title.trim() && !description.trim()) {
    errors.title = 'Title is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  try {
    // Create new notice
    const newNotice = new Notice({
      title,
      description,
      pin
    });

    // Save to MongoDB
    const savedNotice = await newNotice.save();
    

    res.status(201).json({
      message: 'Notice saved to MongoDB successfully',
      data: savedNotice,
    });

    console.log('Saved Notice:', savedNotice);
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
    const noticeData = await Notice.find();

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


module.exports = { addNotice, deleteNotice, getNotices };