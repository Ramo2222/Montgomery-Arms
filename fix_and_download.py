import pandas as pd
import os
import glob
from icrawler.builtin import BingImageCrawler

# Find inventory file
excel_files = glob.glob('*Cost*.xlsx') + glob.glob('*.xlsx')
if not excel_files:
    print("Error: Could not find any .xlsx file!")
    exit()

df = pd.read_excel(excel_files[0], sheet_name='Sales Sheet')
df.columns = df.iloc[0]
df = df.iloc[1:].reset_index(drop=True)

os.makedirs('images', exist_ok=True)

print("\n--- Downloading Exact Product Images ---")
for idx, row in df.iterrows():
    sku = str(row['RSR STOCK #']).strip()
    upc = str(row['UPC CODE']).strip()
    desc = str(row['DESCRIPTION']).strip().replace('\n', ' ')

    if not sku or sku == 'nan':
        continue

    sku_dir = os.path.join('images', sku)
    os.makedirs(sku_dir, exist_ok=True)

    # Clean query to get accurate tactical item photos
    query = f"{sku} {desc}"
    print(f"[{idx+1}/{len(df)}] Downloading images for SKU: {sku}...")

    try:
        crawler = BingImageCrawler(
            downloader_threads=4,
            storage={'root_dir': sku_dir}
        )
        crawler.crawl(keyword=query, max_num=4)
    except Exception as e:
        print(f"  --> Error downloading {sku}: {e}")

print("\n--- Standardizing File Names ---")
for sku_folder in os.listdir('images'):
    folder_path = os.path.join('images', sku_folder)
    if os.path.isdir(folder_path):
        files = sorted(os.listdir(folder_path))
        for count, file in enumerate(files, 1):
            file_path = os.path.join(folder_path, file)
            num_str = f"00000{count}" if count < 10 else f"0000{count}"
            target_path = os.path.join(folder_path, f"{num_str}.jpg")

            if file_path != target_path and not os.path.exists(target_path):
                try:
                    os.rename(file_path, target_path)
                except Exception:
                    pass

print("\nDone! All images processed.")