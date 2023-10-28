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