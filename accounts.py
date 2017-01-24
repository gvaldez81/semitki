import sys
import traceback
import MySQLdb as mdb
import json
from contextlib import closing
import requests
import os
from collections import defaultdict


def getTwitterAccounts():
   con = mdb.connect(host="localhost", user="rscontroller",passwd="123,.-123",db="zapmariadb")
   with con:
      try:
         query = 'SELECT au.username, au.id,  sau.uid, sau.extra_data, ug.grupos '
         query = query +'FROM auth_user au '
         query = query +'INNER JOIN social_auth_usersocialauth sau on sau.user_id = au.id '
         query = query +'LEFT JOIN (SELECT u.id, group_concat(g.grupo SEPARATOR ",") AS grupos '
         query = query +'FROM  auth_user u  INNER JOIN twhandlerapp_usergroup g '
         query = query +'ON g.usuario_id = u.id WHERE g.isactive ="Y" GROUP BY u.id) AS ug ON ug.id = au.id ' 
         query = query +'WHERE sau.provider = %s '
         cur = con.cursor()
         cur.execute(query,['twitter'])
         cuentas={}
         grupos={}
         for result in cur:
            cuentas[result[0]]=[result[2], result[3]]
            grupos.setdefault('TODOS', []).append(result[0])
            if result[4] is not None:
               for grupo in result[4].split(','):
                  grupos.setdefault(grupo, [])
                  grupos[grupo].append(result[0])
            
         #print (cuentas)   
         #print (grupos)
         return(cuentas, grupos)
      except Exception as e:
         print("TW Error = "+str(e))
         print(traceback.format_exc())
         return('error')


