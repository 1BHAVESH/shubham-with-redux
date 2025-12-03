import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import BannerForm from "@/components/admin/BannerForm";
import { useGetBannersQuery, useDeleteBannerMutation } from "@/redux/features/adminApi";
import { toast } from "sonner";

export default function BannerManagement() {
  const { data: bannersData, isLoading, error } = useGetBannersQuery();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const banners = bannersData?.data || [];

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedBanner(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBanner(bannerToDelete._id).unwrap();
      toast.success("Banner deleted successfully!");
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete banner");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load banners. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-12 lg:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Banner Management</h1>
          <p className="text-zinc-400 mt-1">Manage your website banners</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#d4af37] hover:bg-[#b8962f] text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        {banners.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No banners found. Add your first banner.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Image</TableHead>
                  <TableHead className="text-zinc-400">Title</TableHead>
                  <TableHead className="text-zinc-400 hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-zinc-400 hidden sm:table-cell">Order</TableHead>
                  <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner._id} className="border-zinc-800">
                    <TableCell>
                      {banner.imageUrl ? (
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-zinc-800 rounded flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-zinc-500" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {banner.title}
                    </TableCell>
                    <TableCell className="text-zinc-400 hidden md:table-cell max-w-[200px] truncate">
                      {banner.description || "-"}
                    </TableCell>
                    <TableCell className="text-zinc-400 hidden sm:table-cell">
                      {banner.order || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => handleEdit(banner)}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => handleDeleteClick(banner)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <BannerForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        banner={selectedBanner}
      />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete Banner</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to delete &quot;{bannerToDelete?.title}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
