// Uploads one image file to imgbb and returns its public URL
export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not set up (missing imgbb key)");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!data?.success) throw new Error("Image upload failed. Please try another image.");
  return data.data.display_url as string;
}
