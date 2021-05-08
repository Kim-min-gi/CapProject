import time
from selenium import webdriver
import re
from bs4 import BeautifulSoup
import pandas as pd
import pymongo
import sys

client = pymongo.MongoClient("mongodb://localhost:27017/")

db = client["data"]
col = db["cro"]

def insta_searching(word):
    url = "http://www.instagram.com/explore/tags/" + word
    return url

driver = webdriver.Chrome('chromedriver.exe')


driver.get('http://www.instargram.com')
time.sleep(3)



email = 'crawltest0_1'
input_id = driver.find_elements_by_css_selector('input._2hvTZ.pexuQ.zyHYP')[0]
input_id.clear()
input_id.send_keys(email)

password = 'testcrawl'
input_pw = driver.find_elements_by_css_selector('input._2hvTZ.pexuQ.zyHYP')[1]
input_pw.clear()
input_pw.send_keys(password)
input_pw.submit()
time.sleep(3)

word = sys.argv[1]
url = insta_searching(word)
driver.get(url)
time.sleep(5)



# HTML에서 첫번째 게시글 찾아 클릭하기
def select_first(driver):
    first = driver.find_element_by_css_selector("div._9AhH0")
    first.click()
    time.sleep(3)


select_first(driver)
results = []


def get_content(driver):
    # html정보
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    # 본문내용
    try:
        content = soup.select('div.C4VMK > span')[0].text
    except:
        content = ' '
    # 해시태그
    tags = re.findall(r'#[^\s#,\\]+', content)
    # 작성일자
    date = soup.select('time._1o9PC.Nzb55')[0]['datetime'][:10]
    # 좋아요 수
    try:
        like = soup.select('div.Nm9Fw > button')[0].text[4:-1]
    except:
        like = ''

    try:
        place = soup.select('div.M30cS')[0].text
    except:
        place = ''

    doc = {'content':content, 'tags':tags, 'date':date, 'like':like, 'place': place}
    db.customers.insert_one(doc)

get_content(driver)


def move_next(driver):
    right = driver.find_element_by_css_selector('a.coreSpriteRightPaginationArrow')
    right.click()
    time.sleep(3)


move_next(driver)

target = 15 # 크롤링할 게시글 수

for i in range(target):


    try:
        data = get_content(driver)
        results.append(data)
        move_next(driver)

    except:
        time.sleep(2)
        driver.close


results_df = pd.DataFrame(results)
driver.close()