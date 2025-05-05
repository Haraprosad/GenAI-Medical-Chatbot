import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(levelname)s - %(message)s')

list_of_files = [
    "src/__init__.py",
    "src/helper.py",
    "src/prompt.py",
    ".env",
    "setup.py",
    "app.py",
    "research/trials.ipynb",
]

for file_path in list_of_files:
    file_path = Path(file_path)
    filedir,filename = os.path.split(file_path)

    if filedir!="":
        # Create directory if it doesn't exist
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir}")

    # Create the file if it doesn't exist
    if not os.path.exists(file_path):
        with open(file_path, 'w') as f:
            pass
        logging.info(f"Creating file: {file_path}")
    else:
        logging.info(f"File already exists: {file_path}")
