import pandas as pd

df = pd.read_csv("~/repos/pharma-dashboard/public/pharma_manufacturing_data.csv")

df.to_json("~/repos/pharma-dashboard/public/pharma_manufacturing.json", orient='records', indent=2)
