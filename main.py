from flask import Flask, request,jsonify,render_template
from flask_cors import CORS
import pymysql

def inertdata(name,id,level0,level1,level2,level3):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    data=(name,id,level0,level1,level2,level3)
    cursor=db.cursor()
    sql="""INSERT INTO scorelist (name, id, level0, level1, level2, level3, sumscore)
    VALUES (%s,%s,%s,%s,%s,%s,%s);
    """
    try:
        cursor.execute(sql,data)
        db.commit()
    except:
        db.rollback()
    cursor.close()
    db.close()

def selectuser(theid,thepassword):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select id,password from userlist where id=%s and password=%s"""
    try:
        cursor.execute(sql,(theid,thepassword))
        db.commit()
    except:
        db.rollback()
    result=cursor.fetchone()
    if result is None:
        cursor.close()
        db.close()
        return False
    else:
        print("user is found")
        print(result)
        cursor.close()
        db.close()
        return True

    

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])

def login():
    data = request.get_json()
    if(selectuser(data['id'],data['password'])):
        print(data['name'],data['id'],data['password'])
        return jsonify({'message': 'Login successful'})
    else: return jsonify({'message': 'Login faild'})

def index():
    return render_template('/www/load.html')

def submit_data():
    data=request.get_json()
    name = data['name']
    id = data['id']
    print("name:",name,"id:",id)
    return '数据已提交'


if __name__ == '__main__':
    app.run()  # 启动 Flask 应用程序


