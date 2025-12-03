import Banner from "../models/Banner.js";

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, isActive, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const banner = await Banner.create({
      title,
      imageUrl,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isActive, order } = req.body;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    banner.title = title || banner.title;
    banner.isActive = isActive !== undefined ? isActive : banner.isActive;
    banner.order = order !== undefined ? order : banner.order;

    if (req.file) {
      banner.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await banner.save();
    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await Banner.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
