import os
from datetime import datetime
import time

def rename_photos(folder_path):
    # Get all files in the directory
    files = []
    for filename in os.listdir(folder_path):
        # Check if the file is an image (you can add more extensions if needed)
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            filepath = os.path.join(folder_path, filename)
            # Get creation time and add to list with filepath
            creation_time = os.path.getctime(filepath)
            files.append((creation_time, filepath))
    
    # Sort files by creation time
    files.sort(key=lambda x: x[0])
    
    # Rename files
    for index, (creation_time, filepath) in enumerate(files, 1):
        # Get the file extension
        _, ext = os.path.splitext(filepath)
        # Create new filename
        new_name = f"photo_{index}{ext}"
        new_filepath = os.path.join(folder_path, new_name)
        
        try:
            os.rename(filepath, new_filepath)
            # Get the creation time as a readable string
            time_str = datetime.fromtimestamp(creation_time).strftime('%Y-%m-%d %H:%M:%S')
            print(f"Renamed: {os.path.basename(filepath)} → {new_name} (Created: {time_str})")
        except Exception as e:
            print(f"Error renaming {filepath}: {e}")

# Example usage
if __name__ == "__main__":
    folder_path = input("Enter the folder path containing the photos: ")
    if os.path.exists(folder_path):
        rename_photos(folder_path)
    else:
        print("Invalid folder path!")