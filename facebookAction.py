import sys
import traceback
import MySQLdb as mdb
from facepy import GraphAPI
import json
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener

CKEY = 'QhIyjwrn8SKnx06emlYLBLrm4'
CSECRET = '0UPpJHQdFojZxg4B3onsZ6If5n7AEbF9KzOOGAOX57q4WXH2UN'

def processPost(row):
   print ("====Autenticando=====")
   con = mdb.connect(host="localhost", user="rscontroller",passwd="123,.-123",db="zapmariadb")
   with con:
      try: 
         query = 'SELECT "user" as tipo, sau.uid as id, sau.extra_data as data, au.id, au.username '
         query = query +'FROM auth_user au '
         query = query +'INNER JOIN social_auth_usersocialauth sau on sau.user_id = au.id '
         query = query +'WHERE au.username=%s '
         query = query +'UNION ALL '
         query = query +'SELECT "fanpage" as tipo, saf.page_id as id, saf.access_token as data, au.id, saf.page_name  '
         query = query +'FROM auth_user au '
         query = query +'INNER JOIN social_auth_fanpages saf on saf.user_id = au.id '
         query = query +'WHERE saf.page_name=%s '
         cur = con.cursor()
         cur.execute(query, [row[4], row[4]])
         result = cur.fetchone()
         postID = '0'
         if result[0] == 'user':
            data = json.loads(result[2])
            ACCESS_TOKEN = data['access_token']
            
         elif result[0] == 'fanpage':
            ACCESS_TOKEN = result[2]
         #post(token, idFacebook, copy, user/fanpage, Post a dar share, idFacebook del post original	
         postID = post(ACCESS_TOKEN, result[1], row[5], result[0], 0, 0)
         if (len(row) > 7):
	    listRow = loadList(con)
	 for pos in range(8, len(row)):
            print('Cuenta a dar RT/Share Num'+str(pos)+' = '+(row[pos] or 'empty'))
            if isinstance(listRow, basestring): # Python 3: isinstance(arg, str):
               print('Error cargando lista de FB');
	       return('error')
            else:
	       #[item for item in listRow if 'SirGerri' in item]
	       #if any('apple' in code for code in CODES):
               shareID = 0
               for item in listRow:
                  if row[pos] in item:
                     if item[4] == 'user':
                        dataShare = json.loads(item[1])
                        TOKEN_SHARE = dataShare['access_token']
                     else:
                        TOKEN_SHARE = item[1]
                     #post(token, idFacebook, copy, user/fanpage, Post a dar share, idFacebook del post original	
                     shareID = post(TOKEN_SHARE, item[0], '', item[4], postID, result[1])
               if shareID == 0:
	          print ('No existe usuario:'+row[pos])
                  return('error')
         return(postID)


         print ("Post ID = "+postID)
         return(postID)
      except Exception as e:
         print("FB Error = "+str(e))  
         print(traceback.format_exc())
         return('error')

def loadList(con):
   with con:
      try:
         query = 'SELECT sau.uid as uid, sau.extra_data as data, au.id as id, au.username as username, "user"  as tipo ' 
         query = query +'FROM auth_user au '
         query = query +'INNER JOIN social_auth_usersocialauth sau on sau.user_id = au.id '
         query = query +'WHERE  sau.provider = "facebook" '
         query = query +'UNION ALL '
         query = query +'SELECT saf.page_id as uid, saf.access_token as data, au.id as id, saf.page_name as username, "fanpage" as tipo '
         query = query +'FROM auth_user au '
         query = query +'INNER JOIN social_auth_fanpages saf on saf.user_id = au.id '

         cur = con.cursor()
         cur.execute(query)
         #head_rows = cursor.fetchmany(size=2)
	 rowList = cur.fetchall()
         return(rowList)
      except Exception as e:
         print("Error LoadList = "+str(e))
         print(traceback.format_exc())
         return('error')

def post(TOKEN, fbID, copy, tipo, sharePostID, shareUserID):
   try:
      graph = GraphAPI(TOKEN)
      if sharePostID == 0:   
         if tipo == 'fanpage':
            response = graph.post(str(fbID)+'/feed', message = copy)
         else:
            response = graph.post('me/feed', message = copy, privacy={'value': 'EVERYONE'})       
         retID = response['id'].split('_')[1]
         print ('Post ID = '+retID)
      else:
         if tipo == 'fanpage':
            response = graph.post(str(fbID)+'/feed', copy, link='https://www.facebook.com/'+shareUserID+'/posts/'+sharePostID)
         else:
            response = graph.post('me/feed', copy, link='https://www.facebook.com/'+shareUserID+'/posts/'+sharePostID, privacy={'value': 'EVERYONE'})       
         retID = response['id'].split('_')[1]
         print ('Share ID = '+retID)
      return(retID)
   except Exception as e:
      print("FB Post Error = "+str(e))  
      print(traceback.format_exc())
      return(0)


    
if __name__ == '__main__':
  try:
    arg = sys.argv[1]
  except IndexError:
    arg = None
  return_val = processPost(arg)





