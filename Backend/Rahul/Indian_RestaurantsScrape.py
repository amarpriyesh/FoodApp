import json
import os

from selectorlib import Extractor
import requests
from time import sleep
import csv

# Create an Extractor by reading from the YAML file
e = Extractor.from_yaml_file('restaurants.yml')

def scrape(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    }
    print("Downloading %s" % url)
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        extracted_data = e.extract(r.text, base_url=url)
        if extracted_data:
            return extracted_data
        else:
            print("No data extracted from %s" % url)
            return None
    else:
        print(f"Failed to retrieve {url} with status code {r.status_code}")
        return None

# Ensure the file names and paths are correctly specified
with open('urls', 'r') as urllist, open('restaurant_data.csv', 'w', newline='') as outfile:
    fieldnames = ["name", "ratings", "location", "description", "reviews","range"]
    writer = csv.DictWriter(outfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
    writer.writeheader()
    for url in urllist.readlines():
        url = url.strip()  # Clean up any whitespace around the URL
        data = scrape(url)
        if data and 'restaurants' in data:
            for restaurant in data['restaurants']:
                writer.writerow(restaurant)
        sleep(5)  # Respectful delay between requests
