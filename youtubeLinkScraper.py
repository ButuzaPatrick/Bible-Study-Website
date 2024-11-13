from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import json

def processSearch(search):
          return search.replace(" ", "+")

def searchForYoutubeLinks(search):
          # Set up the WebDriver (Make sure the appropriate driver is in your PATH)
          driver = webdriver.Chrome(service=Service("C:/Users/butuz/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"))  # Or use EdgeDriver for Edge

          chrome_options = Options()
          chrome_options.add_argument("--headless")  # Run in headless mode
          chrome_options.add_argument("--disable-gpu")  # Optional: Disable GPU usage
          chrome_options.add_argument("--no-sandbox")  # Optional: Required for some environments
          chrome_options.add_argument("--disable-extensions")  # Optional: Disable extensions

          # Open the desired page
          driver.get(f'https://www.youtube.com/results?search_query={search}')  # Replace with your target URL

          # Wait for the page to load
          time.sleep(3)

          # JavaScript command to extract YouTube links
          script = """
                    let youtubeLinks = [];
                    document.querySelectorAll('a').forEach(anchor => {
                              let href = anchor.href;
                              if (href.includes('youtube.com/watch') || href.includes('youtu.be')) {
                              youtubeLinks.push(href);
                    }
                    });
                    return youtubeLinks;
          """

          # Execute the script and get the result
          youtube_links = driver.execute_script(script)

          data = [link for link in youtube_links if "radio" not in str(link)]
          
          data = list(set(data))
          
          new_data = []
          
          for d in data:
                    d = d.split("=", 2)
                    new_data.append(f"{d[0]}={d[1]}")
          



          with open("youtube-links.json", "w") as file:
                    json.dump(new_data,file, indent=4)



          # Close the driver
          driver.quit()
          
          return new_data



if __name__ == "main":
          searchForYoutubeLinks(processSearch("this is what space feels like"))