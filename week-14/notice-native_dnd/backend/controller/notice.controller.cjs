const mongoose = require('mongoose');
const Notice = require('../model/notice.model.cjs')
const Category = require('../model/category.model.cjs');
// const { MongoNetworkError } = require('mongodb');

const DEFAULT_CATEGORY = '680f0c5d80e550f6b26a92f6';

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

    const allCategories = [...new Set([...categories, DEFAULT_CATEGORY])]; //add categories from api body to newCategories const while checking for duplicates

    if (categories[0] === DEFAULT_CATEGORY || !existingNotice.categories.map(catData => catData.category.toString()).includes(categories[0])) {

      //to check if the categories from api exist in category collection
      for (const cat of allCategories) {
        const existing = await Category.findById(cat);
        if (!existing) {
          return res.status(404).json({ message: 'Invalid Category' });
        }
      }

      const categoriesToRemove = existingNotice.categories
        .filter(catData => catData.category.toString() !== DEFAULT_CATEGORY)
        .map(catData => catData.category.toString());

      const categoriesToAdd = categories.filter((cat) => cat !== DEFAULT_CATEGORY)
      console.log(categories);
      console.log(allCategories);
      console.log(existingNotice.categories)


      console.log('remove:', categoriesToRemove, 'add:', categoriesToAdd);
      debugger


      //loop to increment
      for (const cat of categoriesToAdd) {
        await Category.findByIdAndUpdate(cat, { $inc: { counter: 1 } });
      }

      //loop to decrement
      for (const cat of categoriesToRemove) {
        await Category.findByIdAndUpdate(cat.toString(), { $inc: { counter: -1 } });
      }

      //query to remove categories from notice collection
      if (categoriesToRemove.length > 0) {
        for (const cat of categoriesToRemove) {
          await Notice.updateOne(
            { _id: id },
            {
              $pull: {
                categories: {
                  category: new mongoose.Types.ObjectId(cat)
                }
              }
            }
          );
        }
      }

    

      //query to add categories from notice collection
      if (categoriesToAdd.length > 0) {
        for (const cat of categoriesToAdd) {
          const categoryId = new mongoose.Types.ObjectId(cat);

          // Get the current max order for this category across all notices
          const last = await Notice.aggregate([
            { $unwind: "$categories" },
            { $match: { "categories.category": categoryId } },
            { $sort: { "categories.order": -1 } },
            { $limit: 1 },
            { $project: { order: "$categories.order" } }
          ]);

          const lastOrder = last.length > 0 ? last[0].order : 0;

          // Push the new category with incremented order
          await Notice.updateOne(
            { _id: id },
            {
              $push: {
                categories: {
                  category: categoryId,
                  order: lastOrder + 1
                }
              }
            }
          );
        }
      }
 

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

  console.log("log:", categories);

  const filterCategories = categories.filter((cat) => cat !== '')

  if (!filterCategories.includes(DEFAULT_CATEGORY)) {
    filterCategories.push(DEFAULT_CATEGORY);
  }


  // let categoryList = [...new Set(filterCategories?.length ? filterCategories : [DEFAULT_CATEGORY])];
  const filteredCategories = [...new Set(categories.filter((c) => c).concat(DEFAULT_CATEGORY))];

  try {
    // Prepare categories with incremented order
    const categoriesWithOrder = await Promise.all(filteredCategories.map(async (catId) => {
      const lastNotice = await Notice.findOne({ 'categories.category': catId })
        .sort({ 'categories.order': -1 });

      const lastOrder = lastNotice
        ? (lastNotice.categories.find(c => c.category.equals(catId))?.order ?? 0)
        : 0;

      return {
        category: catId,
        order: lastOrder + 1,
      };
    }));
    // Create new notice
    const dbResponseNotice = await Notice.create({
      title,
      description,
      pin,
      categories: categoriesWithOrder,
    })

    // Increment counters in each category
    await Promise.all(filteredCategories.map(catId =>
      Category.findByIdAndUpdate(catId, { $inc: { counter: 1 } })
    ));

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
        await Category.findByIdAndUpdate(cat.category, { $inc: { counter: -1 } });
      }
    }

    for (const { category, order } of noticeByDb.categories) {
      await Notice.updateMany(
        {
          _id: { $ne: id },
          'categories.category': category,
          'categories.order': { $gt: order }
        },
        {
          $inc: { 'categories.$[elem].order': -1 }
        },
        {
          arrayFilters: [{ 'elem.category': category, 'elem.order': { $gt: order } }]
        }
      );
    } 

    console.log(noticeByDb.categories);
    
    
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
    const noticeData = await Notice.find().populate('categories.category').sort({ 'categories.order': 1 });

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

    // const categoryId = new mongoose.Types.ObjectId(id);

    // const noticeData = await Notice.aggregate([
    //   {
    //     $match: {
    //       'categories.category': categoryId
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'categories',
    //       localField: 'categories.category',
    //       foreignField: '_id',
    //       as: 'categoryDocs'
    //     }
    //   },
    //   {
    //     $addFields: {
    //       categories: {
    //         $map: {
    //           input: '$categories',
    //           as: 'cat',
    //           in: {
    //             $mergeObjects: [
    //               '$$cat',
    //               {
    //                 category: {
    //                   $arrayElemAt: [
    //                     {
    //                       $filter: {
    //                         input: '$categoryDocs',
    //                         as: 'cd',
    //                         cond: { $eq: ['$$cd._id', '$$cat.category'] }
    //                       }
    //                     },
    //                     0
    //                   ]
    //                 }
    //               }
    //             ]
    //           }
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $project: {
    //       title: 1,
    //       description: 1,
    //       pin: 1,
    //       categories: {
    //         $sortArray: {
    //           input: '$categories',
    //           sortBy: { order: 1 }
    //         }
    //       },
    //       createdAt: 1,
    //       updatedAt: 1
    //     }
    //   }
    // ]);
    
    const categoryId = new mongoose.Types.ObjectId(id);

    const noticeData = await Notice.aggregate([
      // Step 1: Match notices that contain the target category
      {
        $match: {
          'categories.category': categoryId
        }
      },

      // Step 2: Add a matchedCategory field for sorting
      {
        $addFields: {
          matchedCategory: {
            $first: {
              $filter: {
                input: '$categories',
                as: 'cat',
                cond: { $eq: ['$$cat.category', categoryId] }
              }
            }
          }
        }
      },

      // Step 3: Lookup to populate all categories in the notice
      {
        $lookup: {
          from: 'categories',
          localField: 'categories.category',
          foreignField: '_id',
          as: 'categoryDocs'
        }
      },

      // Step 4: Merge category data into categories array
      {
        $addFields: {
          categories: {
            $map: {
              input: '$categories',
              as: 'cat',
              in: {
                $mergeObjects: [
                  '$$cat',
                  {
                    category: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$categoryDocs',
                            as: 'cd',
                            cond: { $eq: ['$$cd._id', '$$cat.category'] }
                          }
                        },
                        0
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },

      // Step 5: Sort categories array inside each notice by `order` field
      // {
      //   $addFields: {
      //     categories: {
      //       $function: {
      //         body: function (cats) {
      //           return cats.sort((a, b) => a.order - b.order);
      //         },
      //         args: ['$categories'],
      //         lang: 'js'
      //       }
      //     }
      //   }
      // },

      // Step 6: Sort the entire result set by the matched category's order
      {
        $sort: {
          'matchedCategory.order': 1
        }
      },

      // Step 7: Final projection
      {
        $project: {
          title: 1,
          description: 1,
          pin: 1,
          categories: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);



   
    console.log(categoryId);
    
    console.log('Notice Data:', noticeData);

  

    // if (noticeData.length === 0) {
    //   return res.status(404).json({ message: 'No notices found' });
    // }

    return res.status(200).json({
      message: 'Notices retrieved successfully',
      data: noticeData,
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const editOrder = async (req, res) => {
  const { oldIndex, newIndex, activeNoticeId, overNoticeId, categoryId } = req.body;
  try {
    console.log("api body",req.body);
    
    const activeNotice = await Notice.findById(activeNoticeId);
    const overNotice = await Notice.findById(overNoticeId);
    if (!activeNotice && !overNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const category = activeNotice.categories.find(cat => cat.category.toString() === categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found in this notice' });
    }

   await Notice.updateOne(
      { _id: activeNoticeId, 'categories.category': categoryId },
      { $set: { 'categories.$.order': newIndex } }
    );

   await Notice.updateOne(
      { _id: overNoticeId, 'categories.category': categoryId },
      { $set: { 'categories.$.order': oldIndex } }
    );

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ message: 'Server error' });
  }


}


module.exports = { addNotice, deleteNotice, getNotices, editNotice, getNoticesByCategory, editOrder };