import requests
from bs4 import BeautifulSoup
import os
from books import bible_chapters
from concurrent.futures import ThreadPoolExecutor

def getBook(url, chapter, book):

          response = requests.get(url)

          if response.status_code == 200:
                    
                    directory = f'C:/Users/butuz/Documents/Official Work Resources/Bible-Study-App/bible/{book}'
                    
                    if chapter == '':
                              file_name = f'{book}.txt'
                    else:
                              file_name = f'{book} {str(chapter)}.txt'
                              
                    file_path = os.path.join(directory, file_name)

                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    if chapter == '':
                              section = soup.find("section", {"data-reference": f"{book}"})
                    else:
                              section = soup.find("section", {"data-reference": f"{book} {str(chapter)}"})

                    verses = section.find_all("span", class_="verse")

                    underlined_children = [verse.find_all("u") for verse in verses]

                    verse_texts = [''.join(u_tag.get_text() for u_tag in verse) for verse in underlined_children]

                              
                    os.makedirs(directory, exist_ok=True)
                    
                    with open(file_path, "w") as file:
                              for verse in verse_texts:
                                        cleaned_text = verse.encode('utf-8', 'ignore').decode('utf-8')
                                        file.write(cleaned_text + "\n")
                    
          else:
                    print(f"Failed to retrieve the page. Status code: {response.status_code}")

# for book, chapters in bible_chapters.items():
#           for chapter in range(chapters):
#                     getBook(f'https://www.esv.org/{book}+{chapter+1}/', chapter+1, book)
                    
                    
# with ThreadPoolExecutor(max_workers=30) as executor:
#     for book, chapters in bible_chapters.items():
#           for chapter in range(chapters):

#                               if chapters == 1:
#                                         website_url = f'https://www.esv.org/{book}/'
#                                         executor.submit(getBook, website_url, '', book)

#                               website_url = f'https://www.esv.org/{book}+{chapter+1}/'
#                               executor.submit(getBook, website_url, chapter+1, book)
#           print(f"Dowloaded:    {book} {chapter}")
                              
directory = f'C:/Users/butuz/Documents/Official Work Resources/Bible-Study-App/bible'
file_count = sum([1 for entry in os.listdir(directory) if os.path.isdir(os.path.join(directory, entry))])

print(f"Number of files: {file_count}")