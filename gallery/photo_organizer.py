import os
import re
from datetime import datetime
from pathlib import Path
import shutil


def organize_photo_folder(folder_path):
    """
    Organizes photos in a given folder and renames both photos and the folder itself.

    Args:
        folder_path (str): Path to the folder containing photos
    """
    folder = Path(folder_path)

    # Verify the folder exists and is within a catalog
    if not folder.exists():
        raise ValueError(f"Folder {folder_path} does not exist")

    parent_folder = folder.parent
    if not any(
        parent.name.lower() in ["portraits", "papercraft", "landscapes"]
        for parent in folder.parents
    ):
        raise ValueError("This folder is not within a recognized catalog")

    # Get list of image files
    image_files = [
        f
        for f in folder.glob("*")
        if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".gif")
    ]

    if not image_files:
        raise ValueError("No image files found in the folder")

    # Get creation date of first image for folder naming
    first_image = min(image_files, key=lambda x: x.stat().st_ctime)
    folder_date = datetime.fromtimestamp(first_image.stat().st_ctime)

    # Clean the current folder name by removing date patterns and special characters
    current_name = folder.name
    cleaned_name = re.sub(
        r"\d{2,4}[-_.]?\d{2}[-_.]?\d{2,4}", "", current_name
    )  # Remove dates
    cleaned_name = re.sub(
        r"[^a-zA-Z0-9\s]", "", cleaned_name
    )  # Remove special characters
    cleaned_name = cleaned_name.strip().replace(" ", "_").lower()

    # Create new folder name with date prefix
    new_folder_name = f"{folder_date.strftime('%Y%m%d')}_{cleaned_name}"
    new_folder_path = folder.parent / new_folder_name

    # Create temporary folder for organizing files
    temp_folder = folder.parent / f"temp_{new_folder_name}"
    temp_folder.mkdir(exist_ok=True)

    # Process each image file
    for index, image_file in enumerate(
        sorted(image_files, key=lambda x: x.stat().st_ctime)
    ):
        # Create new filename with folder name and index
        new_filename = f"{new_folder_name}_{index+1:03d}{image_file.suffix.lower()}"

        # Copy file to temp folder with new name
        shutil.copy2(image_file, temp_folder / new_filename)

    # Remove original folder and rename temp folder
    shutil.rmtree(folder)
    temp_folder.rename(new_folder_path)

    print(f"Successfully organized folder:")
    print(f"Original path: {folder}")
    print(f"New path: {new_folder_path}")
    print(f"Processed {len(image_files)} images")


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Usage: python photo_organizer.py <folder_path>")
        sys.exit(1)

    try:
        organize_photo_folder(sys.argv[1])
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
