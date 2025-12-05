import HomePage from "../models/HomePage.js";

export const getHomePage = async (req, res) => {
  try {
    const data = await HomePage.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Home Page data" });
  }
};


export const createOrUpdateHomePage = async (req, res) => {
  try {
    // Check if HomePage already exists
    let homePage = await HomePage.findOne();

    // If not exists → CREATE
    if (!homePage) {
      const newHomePage = new HomePage(req.body);
      await newHomePage.save();
      return res.json({ message: "Home Page Created", data: newHomePage });
    }

    // If exists → UPDATE
    const updatedHomePage = await HomePage.findOneAndUpdate(
      {},               // single document only
      req.body,
      { new: true }
    );

    return res.json({ message: "Home Page Updated", data: updatedHomePage });

  } catch (error) {
    res.status(500).json({ message: "Error creating/updating Home Page", error: error.message });
  }
};



export const addTestimonial = async (req, res) => {
  try {
    const home = await HomePage.findOne();
    home.testimonials.push(req.body);
    await home.save();

    res.json({ message: "Testimonial Added", home });
  } catch (error) {
    res.status(500).json({ message: "Error adding testimonial" });
  }
};


export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const home = await HomePage.findOne();
    home.testimonials = home.testimonials.filter(t => t._id.toString() !== id);

    await home.save();
    res.json({ message: "Testimonial Deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial" });
  }
};
