import geopandas as gpd
import pandas as pd

# Load your files
world = gpd.read_file("world.geojson")
data = pd.read_csv("games.csv", sep=";")

# Make sure both country columns have the same names and format
# For example, if your GeoJSON uses "ADMIN" for country names:
world.rename(columns={"shapeName": "country"}, inplace=True)

# Merge based on country name
merged = world.merge(data, on="country", how="left")

# Save as GeoJSON
merged.to_file("games_merged.geojson", driver="GeoJSON")

print("✅ Created games_merged.geojson with your data merged in.")
