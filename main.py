from flask import Flask, request,jsonify,render_template,make_response
from flask_cors import CORS ,cross_origin
import pymysql

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    if(data['type']=="login"):
        if(selectuser(data['id'],data['password'])):
            print(data['name'],data['id'],data['password']," sign in")
            return jsonify({'message': 'Login successful'})
        else: return jsonify({'message': 'Login faild'})
    elif (data['type']=="create"):
        print(data['name'],data['id'],data['password']," sign up")
        createuser(data['name'], data['id'],data['password'])
        return jsonify({'message': 'signup & Login successful'})
    elif (data['type']=="submit"):
        print(data['name'],data["id"],data['score0'],data['score1'],data['score2'],data['score3'],data['sumscore']," submitscore")
        inserttoscorelist(data['name'],data["id"],data['score0'],data['score1'],data['score2'],data['score3'],data['sumscore'])
        return jsonify({'message': 'Submit successful'})
    elif (data['type']=="delete"):
        print(data['name'],data["id"]," deleted")
        deletescore(data['name'],data["id"])
        return jsonify({'message': 'Delete successful'})
    elif (data['type']=="updata"):
        print(data['name'],data['id']," :score is updata to:",data['score0'],data['score1'],data['score2'],data['score3'],data['sumscore'])
        rootupdata(data['name'],data['id'],data['score0'],data['score1'],data['score2'],data['score3'],data['sumscore'])
        return jsonify({'message': 'Updata successful'})

def selectuser(theid,thepassword):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select id,password from userlist where id=%s and password=%s ;"""
    try:
        cursor.execute(sql,(theid,thepassword))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    result=cursor.fetchone()
    if result is None:
        cursor.close()
        db.close()
        return False
    else:
        cursor.close()
        db.close()
        return True

def createuser(thename,theid,thepassword):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""insert into userlist(id,password) values(%s,%s)"""
    try:
        cursor.execute(sql,(theid,thepassword))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""insert into scorelist(name,id,level0,level1,level2,level3,sumscore) values(%s,%s,0,0,0,0,0)"""
    try:
        cursor.execute(sql,(thename,theid))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()

def inserttoscorelist(name,id,score0,score1,score2,score3,sumscore):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select id from scorelist where id=%s;"""
    try:
        cursor.execute(sql,(id,))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    result=cursor.fetchone()
    if(result is None):
        cursor.close()
        db.close()
        insertdata(name,id,score0,score1,score2,score3,sumscore)
    else:
        cursor.close()
        db.close()
        updatascore(name,id,score0,score1,score2,score3,sumscore)

def insertdata(name,id,level0,level1,level2,level3,sumscore):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""INSERT INTO scorelist (name, id, level0, level1, level2, level3, sumscore)
    VALUES (%s,%s,%s,%s,%s,%s,%s);
    """
    try:
        cursor.execute(sql,(name,id,level0,level1,level2,level3,sumscore))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    cursor.close()
    db.close()

def updatascore(name,id,level0,level1,level2,level3,sumscore):
    db = pymysql.connect(host='localhost',
                user='root',
                password='666666',
                database='openlab1'
                )
    cursor=db.cursor()
    sql="""update scorelist set name=%s,level0=%s,level1=%s,level2=%s,level3=%s,sumscore=%s where id=%s;"""
    try:
        cursor.execute(sql,(name,level0,level1,level2,level3,sumscore,id))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()

def searchuser(theid):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select id,password from userlist where id=%s;"""
    try:
        cursor.execute(sql,(theid))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    result=cursor.fetchone()
    if result is None:
        cursor.close()
        db.close()
        return False
    else:
        cursor.close()
        db.close()
        return True

def searchscore(theid):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select id from scorelist where id=%s;"""
    try:
        cursor.execute(sql,(theid))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    result=cursor.fetchone()
    if result is None:
        cursor.close()
        db.close()
        return False
    else:
        cursor.close()
        db.close()
        return True

def rootupdata(name,id,level0,level1,level2,level3,sumscore):
    if (not searchuser(id)):
        password=id[-6:]
        createuser(name,id,password)
    inserttoscorelist(name,id,level0,level1,level2,level3,sumscore)

def deletescore(name,id):
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""delete from scorelist where id=%s"""
    try:
        cursor.execute(sql,(id,))
        print("user: %s, id: %s score deleted" % (name, id))
        db.commit()
    except Exception as e:
        print("An error occurred:", e)
        db.rollback()
    cursor.close()
    db.close()

@app.route('/getlist', methods=['GET'])
@cross_origin()
def get_data():
    db = pymysql.connect(host='localhost',
                        user='root',
                        password='666666',
                        database='openlab1'
                        )
    cursor=db.cursor()
    sql="""select * from scorelist order by sumscore desc;"""
    try:
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()
    result=cursor.fetchall()
    if(result is None):
        print("Not found")
    return jsonify(result)

if __name__ == '__main__':
    app.run()  # 启动 Flask 应用程序


