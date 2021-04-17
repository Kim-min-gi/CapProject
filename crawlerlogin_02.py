import csv
import sys
import pandas as pd
import os
import time
from selenium import webdriver
from pymongo import MongoClient
import re
from bs4 import BeautifulSoup


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
time.sleep(3)


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
    # ② 본문내용
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
        like = 0

    try:
        place = soup.select('div.M30cS')[0].text
    except:
        place = ''

    data = [content, date, like, place, tags]
    return data


get_content(driver)


def move_next(driver):
    right = driver.find_element_by_css_selector('a.coreSpriteRightPaginationArrow')
    right.click()
    time.sleep(3)


move_next(driver)

target = 20 # 크롤링할 게시글 수

for i in range(target):

    try:
        data = get_content(driver)
        results.append(data)
        move_next(driver)
    except:
        time.sleep(2)
        move_next(driver)

#print(results[:2])  이것때문에 안되었던 거였음.


results_df = pd.DataFrame(results)
#results_df.columns = ['index','content', 'data', 'like', 'place', 'tags']
results_df.to_csv('insta.csv', encoding='utf-8-sig')

insta_df = pd.DataFrame([])

folder = os.getcwd()
f_list = ['insta.csv']
for fname in f_list:
    fpath = folder +'\\'+ fname
    temp = pd.read_csv(fpath)
    insta_df = insta_df.append(temp)

insta_df.columns = ['index','content', 'data', 'like', 'place', 'tags']

insta_df.drop_duplicates(subset=["content"], inplace=True)
insta_df.to_csv('insta.csv', index=False)

driver.close()
