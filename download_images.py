import pandas as pd
import os
import glob
from icrawler.builtin import GoogleImageCrawler

# Locate the Excel file automatically even with extra spaces
excel_files = glob.glob('*Cost*.xlsx') + glob.glob('*.xlsx')
if not excel_files:
    raise FileNotFoundError("Could not find any .xlsx cost sheet in this folder!")

target_file = excel_files[0]
print(f"Loading inventory data from: '{target_file}'...\n")

# Read Sales Sheet
df = pd.read_excel(target_file, sheet_name='Sales Sheet')
df.columns = df.iloc[0]
df = df.iloc[1:].reset_index(drop=True)

# Ensure images directory exists
os.makedirs('images', exist_ok=True)

for idx, row in df.iterrows():
    sku = str(row['RSR STOCK #']).strip()
    upc = str(row['UPC CODE']).strip()
    desc = str(row['DESCRIPTION']).strip().replace('\n', ' ')

    if not sku or sku == 'nan':
        continue

    # Query Google using exact UPC code if available, otherwise description
    if upc and upc != 'nan':
        query = f"{upc} firearm product"
    else:
        query = f"{desc} firearm"

    sku_dir = os.path.join('images', sku)
    
    if not os.path.exists(sku_dir):
        os.makedirs(sku_dir, exist_ok=True)
        print(f"[{idx+1}/{len(df)}] Downloading 4 images for SKU: {sku} (Query: {query})...")
        
        try:
            google_crawler = GoogleImageCrawler(
                feeder_threads=1,
                parser_threads=1,
                downloader_threads=4,
                storage={'root_dir': sku_dir}
            )
            google_crawler.crawl(keyword=query, max_num=4)
        except Exception as e:
            print(f"Error crawling {sku}: {e}")

print("\nFinished downloading all product images!")