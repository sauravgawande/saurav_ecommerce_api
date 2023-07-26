const Category=require("../Model/category");

exports.getCategory = async (req, res) => {
    const category = await Category.find();
    if (category) {
      res.send(category);
    } else {
      res.send("data not found");
    }
  };

  exports.addCategory=async(req,res)=>{
    const categoriesData={
      categoryName:req.body.categoryName,
      categoryType:req.body.categoryType,
        createdAt:req.body.createdAt
    };
    const categories = await Category.create(categoriesData);
  res.json(categories);
  }

  exports.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).json({
        success: false,
        error: "User is invalid",
      });
    }
  
    res.status(200).json({
      success: true,
      category,
    });
  };