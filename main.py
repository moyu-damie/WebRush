import requests
from bs4 import BeautifulSoup

# 创建一个session对象
session = requests.Session()


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61"
}# 构造登录请求的数据
data = {
    "username": "202200130135",
    "password": "Texas.com1sddx"
}

# 发送登录请求
response = session.post('https://pass.sdu.edu.cn/cas/login?service=https://oj.qd.sdu.edu.cn/v2/thirdPartyLogin?thirdParty=SDUCAS', data=data, headers=headers)
print(response)
# 使用session对象发送其他请求
response = session.get("https://oj.qd.sdu.edu.cn/v2/problem",headers=headers)
soup=BeautifulSoup(response.text,"html.parser")
all_name=soup.find_all("button")
for name in all_name:
    print(name.string)


