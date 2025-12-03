import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Upload, X, FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/redux/features/adminApi";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("data:") || url.startsWith("http") || url.startsWith("blob:")) return url;
  return `${API_URL}${url}`;
};

export default function ProjectForm({ open, onOpenChange, project }) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Image states
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [overviewImagePreview, setOverviewImagePreview] = useState(null);
  const [selectedOverviewImage, setSelectedOverviewImage] = useState(null);
  const [masterPlanPreview, setMasterPlanPreview] = useState(null);
  const [selectedMasterPlan, setSelectedMasterPlan] = useState(null);
  const [floorPlanPreview, setFloorPlanPreview] = useState(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [buildingImagePreview, setBuildingImagePreview] = useState(null);
  const [selectedBuildingImage, setSelectedBuildingImage] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);

  // Document states
  const [selectedBrochure, setSelectedBrochure] = useState(null);
  const [brochureName, setBrochureName] = useState(null);
  const [selectedPriceSheet, setSelectedPriceSheet] = useState(null);
  const [priceSheetName, setPriceSheetName] = useState(null);

  const isEditing = !!project;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      tagline: "",
      description: "",
      location: "",
      address: "",
      status: "ongoing",
      price: "",
      area: "",
      propertyTypes: "",
      contactNumber: "",
      videoUrl: "",
      mapEmbedUrl: "",
      isActive: true,
      isFeatured: false,
      order: 0,
      amenities: [],
      highlights: [],
      nearbyLocations: [],
    },
  });

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({ control, name: "amenities" });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlights" });

  const {
    fields: nearbyFields,
    append: appendNearby,
    remove: removeNearby,
  } = useFieldArray({ control, name: "nearbyLocations" });

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        tagline: project.tagline || "",
        description: project.description || "",
        location: project.location || "",
        address: project.address || "",
        status: project.status || "ongoing",
        price: project.price || "",
        area: project.area || "",
        propertyTypes: project.propertyTypes || "",
        contactNumber: project.contactNumber || "",
        videoUrl: project.videoUrl || "",
        mapEmbedUrl: project.mapEmbedUrl || "",
        isActive: project.isActive ?? true,
        isFeatured: project.isFeatured ?? false,
        order: project.order || 0,
        amenities: project.amenities || [],
        highlights: project.highlights || [],
        nearbyLocations: project.nearbyLocations || [],
      });
      setImagePreview(getImageUrl(project.imageUrl));
      setLogoPreview(getImageUrl(project.logoUrl));
      setOverviewImagePreview(getImageUrl(project.overviewImageUrl));
      setMasterPlanPreview(getImageUrl(project.masterPlanImageUrl));
      setFloorPlanPreview(getImageUrl(project.floorPlanImageUrl));
      setBuildingImagePreview(getImageUrl(project.buildingImageUrl));
      setGalleryPreviews((project.galleryImages || []).map(getImageUrl));
      setBrochureName(project.brochureUrl ? "Current Brochure" : null);
      setPriceSheetName(project.priceSheetUrl ? "Current Price Sheet" : null);
    } else {
      reset({
        title: "",
        tagline: "",
        description: "",
        location: "",
        address: "",
        status: "ongoing",
        price: "",
        area: "",
        propertyTypes: "",
        contactNumber: "",
        videoUrl: "",
        mapEmbedUrl: "",
        isActive: true,
        isFeatured: false,
        order: 0,
        amenities: [],
        highlights: [],
        nearbyLocations: [],
      });
      resetAllPreviews();
    }
    resetAllSelectedFiles();
  }, [project, reset]);

  const resetAllPreviews = () => {
    setImagePreview(null);
    setLogoPreview(null);
    setOverviewImagePreview(null);
    setMasterPlanPreview(null);
    setFloorPlanPreview(null);
    setBuildingImagePreview(null);
    setGalleryPreviews([]);
    setBrochureName(null);
    setPriceSheetName(null);
  };

  const resetAllSelectedFiles = () => {
    setSelectedImage(null);
    setSelectedLogo(null);
    setSelectedOverviewImage(null);
    setSelectedMasterPlan(null);
    setSelectedFloorPlan(null);
    setSelectedBuildingImage(null);
    setSelectedGalleryImages([]);
    setSelectedBrochure(null);
    setSelectedPriceSheet(null);
  };

  const handleImageChange = (e, setPreview, setSelected) => {
    const file = e.target.files[0];
    if (file) {
      setSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedGalleryImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePdfChange = (e, setSelected, setName) => {
    const file = e.target.files[0];
    if (file) {
      setSelected(file);
      setName(file.name);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("title", data.title);
      formData.append("tagline", data.tagline);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("address", data.address);
      formData.append("status", data.status);
      formData.append("price", data.price);
      formData.append("area", data.area);
      formData.append("propertyTypes", data.propertyTypes);
      formData.append("contactNumber", data.contactNumber);
      formData.append("videoUrl", data.videoUrl);
      formData.append("mapEmbedUrl", data.mapEmbedUrl);
      formData.append("isActive", data.isActive);
      formData.append("isFeatured", data.isFeatured);
      formData.append("order", data.order);

      // Filter out empty array items before submission
      const filteredAmenities = data.amenities.filter((a) => a.icon && a.name);
      const filteredHighlights = data.highlights.filter((h) => h.title && h.subtitle);
      const filteredNearbyLocations = data.nearbyLocations.filter((n) => n.name);

      // Arrays as JSON
      formData.append("amenities", JSON.stringify(filteredAmenities));
      formData.append("highlights", JSON.stringify(filteredHighlights));
      formData.append("nearbyLocations", JSON.stringify(filteredNearbyLocations));

      // Images
      if (selectedImage) formData.append("image", selectedImage);
      if (selectedLogo) formData.append("logo", selectedLogo);
      if (selectedOverviewImage) formData.append("overviewImage", selectedOverviewImage);
      if (selectedMasterPlan) formData.append("masterPlanImage", selectedMasterPlan);
      if (selectedFloorPlan) formData.append("floorPlanImage", selectedFloorPlan);
      if (selectedBuildingImage) formData.append("buildingImage", selectedBuildingImage);
      selectedGalleryImages.forEach((img) => formData.append("galleryImages", img));

      // Documents
      if (selectedBrochure) formData.append("brochure", selectedBrochure);
      if (selectedPriceSheet) formData.append("priceSheet", selectedPriceSheet);

      if (isEditing) {
        await updateProject({ id: project._id, formData }).unwrap();
        toast.success("Project updated successfully!");
      } else {
        await createProject(formData).unwrap();
        toast.success("Project created successfully!");
      }

      onOpenChange(false);
      reset();
      resetAllPreviews();
      resetAllSelectedFiles();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const ImageUploadField = ({ label, preview, setPreview, setSelected, required }) => (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-red-500">*</span>}</Label>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => { setPreview(null); setSelected(null); }}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors">
          <Upload className="w-6 h-6 text-zinc-400 mb-1" />
          <span className="text-zinc-400 text-xs">Click to upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setPreview, setSelected)}
          />
        </label>
      )}
    </div>
  );

  const PdfUploadField = ({ label, name, setSelected, setName }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {name ? (
        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#d4af37]" />
            <span className="text-zinc-300 text-sm truncate max-w-[150px]">{name}</span>
          </div>
          <button
            type="button"
            onClick={() => { setSelected(null); setName(null); }}
            className="p-1 text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors">
          <FileText className="w-5 h-5 text-zinc-400 mb-1" />
          <span className="text-zinc-400 text-xs">Upload PDF</span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handlePdfChange(e, setSelected, setName)}
          />
        </label>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4af37]">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("title", { required: "Project title is required" })}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="Enter project tagline"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("tagline")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                className="bg-zinc-800 border-zinc-700 min-h-[80px]"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Jodhpur"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("location")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Full address"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("address")}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full h-9 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  {...register("status")}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="e.g., 50 Lakhs"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("price")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  placeholder="e.g., 2000 sq ft"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("area")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyTypes">Property Types</Label>
                <Input
                  id="propertyTypes"
                  placeholder="e.g., 2BHK, 3BHK"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("propertyTypes")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="e.g., +91 9876543210"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("contactNumber")}
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4af37]">Images</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <ImageUploadField
                label="Main Image"
                preview={imagePreview}
                setPreview={setImagePreview}
                setSelected={setSelectedImage}
                required
              />
              <ImageUploadField
                label="Logo"
                preview={logoPreview}
                setPreview={setLogoPreview}
                setSelected={setSelectedLogo}
              />
              <ImageUploadField
                label="Overview Image"
                preview={overviewImagePreview}
                setPreview={setOverviewImagePreview}
                setSelected={setSelectedOverviewImage}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ImageUploadField
                label="Master Plan"
                preview={masterPlanPreview}
                setPreview={setMasterPlanPreview}
                setSelected={setSelectedMasterPlan}
              />
              <ImageUploadField
                label="Floor Plan"
                preview={floorPlanPreview}
                setPreview={setFloorPlanPreview}
                setSelected={setSelectedFloorPlan}
              />
              <ImageUploadField
                label="Building Image"
                preview={buildingImagePreview}
                setPreview={setBuildingImagePreview}
                setSelected={setSelectedBuildingImage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                placeholder="Enter YouTube or video URL"
                className="bg-zinc-800 border-zinc-700"
                {...register("videoUrl")}
              />
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <Label>Gallery Images</Label>
              <div className="grid grid-cols-4 gap-2">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Gallery ${index}`} className="w-full h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors">
                  <Plus className="w-5 h-5 text-zinc-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4af37]">Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              <PdfUploadField
                label="Brochure (PDF)"
                name={brochureName}
                setSelected={setSelectedBrochure}
                setName={setBrochureName}
              />
              <PdfUploadField
                label="Price Sheet (PDF)"
                name={priceSheetName}
                setSelected={setSelectedPriceSheet}
                setName={setPriceSheetName}
              />
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d4af37]">Amenities</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendAmenity({ icon: "", name: "" })}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Amenity
              </Button>
            </div>
            {amenityFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Icon (e.g., 🏊)"
                  className="bg-zinc-800 border-zinc-700 w-24"
                  {...register(`amenities.${index}.icon`)}
                />
                <Input
                  placeholder="Amenity name"
                  className="bg-zinc-800 border-zinc-700 flex-1"
                  {...register(`amenities.${index}.name`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAmenity(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Highlights Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d4af37]">Highlights</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendHighlight({ title: "", subtitle: "" })}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Highlight
              </Button>
            </div>
            {highlightFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Title (e.g., 2 & 3 BHK)"
                  className="bg-zinc-800 border-zinc-700 flex-1"
                  {...register(`highlights.${index}.title`)}
                />
                <Input
                  placeholder="Subtitle (e.g., Apartments)"
                  className="bg-zinc-800 border-zinc-700 flex-1"
                  {...register(`highlights.${index}.subtitle`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHighlight(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Nearby Locations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d4af37]">Nearby Locations</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendNearby({ name: "", distance: "3.5 KM" })}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Location
              </Button>
            </div>
            {nearbyFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder="Location name"
                  className="bg-zinc-800 border-zinc-700 flex-1"
                  {...register(`nearbyLocations.${index}.name`)}
                />
                <Input
                  placeholder="Distance (e.g., 3.5 KM)"
                  className="bg-zinc-800 border-zinc-700 w-32"
                  {...register(`nearbyLocations.${index}.distance`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNearby(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4af37]">Map</h3>
            <div className="space-y-2">
              <Label htmlFor="mapEmbedUrl">Map Embed URL</Label>
              <Input
                id="mapEmbedUrl"
                placeholder="Google Maps embed URL"
                className="bg-zinc-800 border-zinc-700"
                {...register("mapEmbedUrl")}
              />
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#d4af37]">Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  className="w-4 h-4 accent-[#d4af37]"
                  {...register("isActive")}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  className="w-4 h-4 accent-[#d4af37]"
                  {...register("isFeatured")}
                />
                <Label htmlFor="isFeatured">Featured</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("order", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#d4af37] hover:bg-[#b8962f] text-black"
            >
              {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
