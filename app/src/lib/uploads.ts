export const MAX_IMAGE_BYTES = 1024 * 1024;
export const MAX_IMAGE_LABEL = "1 MB";

export function readValidatedImage(
  file: File | undefined,
  onSuccess: (dataUrl: string) => void,
  onError: (message: string) => void,
) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    onError("Please choose an image file.");
    return;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    onError(`Image is too large. Maximum size is ${MAX_IMAGE_LABEL}.`);
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => onError("The image could not be read. Please try another file.");
  reader.onload = () => onSuccess(reader.result as string);
  reader.readAsDataURL(file);
}

