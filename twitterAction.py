import sys
import traceback
import MySQLdb as mdb
import tweepy
import json
import requests
import os
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
from contextlib import closing
from collections import defaultdict
from readDrives import downloadFile

CKEY = 'QhIyjwrn8SKnx06emlYLBLrm4'
CSECRET = '0UPpJHQdFojZxg4B3onsZ6If5n7AEbF9KzOOGAOX57q4WXH2UN'

def processTweet(row, cuentas, grupos):
   print ("====Autenticando=====")
   twitsShare={}
   twitsFav={}
   idresumen=''
   try:
      #print('Usuario del tweet ='+result[3]
      if row[4]=='INTERNO':
         if row[5]=='TODOS':
            i=1
            for cuenta in grupos['TODOS']:
               tweetID = tweet(json.loads(cuentas[cuenta][1]), row[7], 0, row[9] if len(row)>9 else None)
               #tweetID=i
               i+=1
               if tweetID>0:
                  if len(row)>10:
                     twitsShare[tweetID]=row[10]
                  if len(row)>11:
                     twitsFav[tweetID]=row[11] 
               #print('Usuario='+cuenta+' - Twitt='+str(i))
            idresumen=['TODOS','TODOS']
         elif row[5] in cuentas:
            tweetID = tweet(json.loads(cuentas[row[5]][1]), row[7], 0, row[9] if len(row)>9 else None)
            #tweetID=1000
            if tweetID>0:
               if len(row)>10:
                  twitsShare[tweetID]=row[10]
               if len(row)>11:
                  twitsFav[tweetID]=row[11] 
            #print('Usuario='+row[5]+' - Twitt='+tweetID)
            idresumen=[str(tweetID), row[5]]
         else:
            print('no existe')
      elif row[4]=='EXTERNO':
         tweetID=row[6]
         if len(row)>10:
            twitsShare[tweetID]=row[10]
         if len(row)>11:
            twitsFav[tweetID]=row[11] 
         idresumen=[str(tweetID), 'EXTERNO']

      shares = processShare(twitsShare, cuentas, grupos)
      favs = processFav(twitsFav, cuentas, grupos)
      resumen = ' Tweet ID ='+idresumen[0]
      resumen = resumen + '|Cuentas={'+idresumen[1]
      
      resumen = resumen + '}|RT={'
      for nickS in shares:
         resumen = resumen + nickS +','
      resumen = resumen + '}|Fav={'
      for nickF in favs:
         resumen = resumen + nickF +','
      resumen = resumen + '}'
      return(resumen)
   except Exception as e:
      print("TW Error = "+str(e))
      print(traceback.format_exc())
      return('error')

#Metodo por identificar
def processFav(twits, cuentas, grupos):
   retVal=''
   if twits is not None:
      for twit in twits:
         #print(twits[twit])
         for fav in grupos[twits[twit]]:
            #print('Fav='+str(twit))
            status = favorite(json.loads(cuentas[fav][1]), twit)
            retVal=retVal+fav+','
            #print('Fav='+status)
   return retVal[:-1].split(',') if retVal is not '' else ''

#Metodo por identificar
def processShare(twits, cuentas, grupos):
   retVal=''
   if twits is not None:
      for twit in twits:
         #print(twits[twit])
         for rt in grupos[twits[twit]]:
            tweetID = tweet(json.loads(cuentas[rt][1]), '', twit, None)
            retVal=retVal+rt+','
            #print(twits[twit]+'-'+rt+' ---------'+str(twit))
   return retVal[:-1].split(',') if retVal is not '' else ''

   #Iteramos por todas las celdas a partir de la 7 hasta encontrar vacia
            #por cada valor de la celda lo comparamos contra el listado de cuentas
            #y si es igual lanzamos el tweet,
            #si el valor de la celda es TODAS no importa la cuenta, y se hace share con todas
            # for pos in range(8, len(row)):
            #    print('Cuenta a dar RT/Share Num'+str(pos)+' = '+(row[pos] or 'empty'))
            #    #Verificamos que tengamos la lista de cuentas cargadas correctamente
            #    if isinstance(listRow, basestring): # Python 3: isinstance(arg, str):
            #       print('Error cargando lista de TW');
            #       return('error')
            #    else:
            #    #[item for item in listRow if 'SirGerri' in item]
            #    #if any('apple' in code for code in CODES):
            #       rtID = 0
            #       #Lanzamos los twitts por las cuentas seleccionadas o por TODAS
            #       for item in listRow:
            #          if (row[pos] in item or row[8] == 'TODAS') and result[3] not in item:
            #             print ('Usuario haciendo rt : '+item[3])
            #             dataRT = json.loads(item[1])
            #             rtID = tweet(dataRT,'', tweetID, None)
            #       if rtID == 0:
            #          print ('No existe usuario:'+row[pos])
            #          return('error')


def tweet(data, copy, tweetID, imagen):
   ATOKEN = data['access_token']['oauth_token'] 
   ASECRET = data['access_token']['oauth_token_secret']
   auth = OAuthHandler(CKEY,CSECRET)
   auth.set_access_token(ATOKEN, ASECRET)
   api = tweepy.API(auth)
   if tweetID == 0:
      if imagen is None:
         try:
            twit = api.update_status(status=copy)
            print ("Tweet ID = "+twit.id_str)
            return (twit.id_str)
         except Exception as e:
            return(data['access_token']['screen_name'] + ' ' +
                     e[0][0]['message'])
      #Si la imagen empieza con http hay que descargarla
      elif imagen.startswith("http") :
         #EVALUAR EL TAMANO DE LA IMAGEN
         r = requests.head(imagen)
         if r is not None and \
            r.headers['content-length'] is not None and \
            int(int(r.headers['content-length'])/1024)<3072:
         #DESCARGAMOS IMAGEN SOLO SI ES MENOR A 3072
            file = 'temp.png'
            r = requests.get(imagen, stream=True)
            if r.status_code == 200:
               with open(file, 'wb') as f:
                  for chunk in r.iter_content(1024):
                     f.write(chunk)     
               
               upload = api.media_upload(filename=file)
               media_ids = [upload.media_id_string]
               os.remove(file)
               try:
                  twit = api.update_status(media_ids, status=copy[:140])
                  print ("Tweet ID = "+twit.id_str)
                  return (twit.id_str)
               except Exception as e:
                  return(data['access_token']['screen_name'] + ' ' +
                           e[0][0]['message'])
            else:
               print("Unable to download image")
               return("Unable to download image")
         else:
            print("Tamano de la imagen superior al limite")
            return("Tamano de la imagen superior al limite")
      # Si no , es una imagen en google drive que hay que descargar
      else :
         #EVALUAR EL TAMANO DE LA IMAGEN
         file = downloadFile(imagen)
         if file is not None:
            if int(int(os.path.getsize(file))/1024)<3072:
               upload = api.media_upload(filename=file)
               media_ids = [upload.media_id_string]
               os.remove(file)
               try:
                  twit = api.update_status(media_ids, status=copy[:140])
                  print ("Tweet ID = "+twit.id_str)
                  return (twit.id_str)
               except Exception as e:
                  return(data['access_token']['screen_name'] + ' ' +
                           e[0][0]['message'])
            else:
               print("Tamano de la imagen superior al limite")
               return("Tamano de la imagen superior al limite")
         else:
            print('No se encontro archivo')
            return('No se encontro archivo')
   else:
      #twit = api.statuses_lookup([tweetID])[0]
      #print(json.dumps(tweet_dict, indent = 2))
      #print(tweet.text)
      try:
         rt = api.retweet(id=tweetID)
      #print("Tweet RT ID ="+rt.id_str)
         return (tweetID)
      except Exception as e:
         return(data['access_token']['screen_name'] + ' ' +
               e[0][0]['message'])

def favorite(data, tweetID):
   ATOKEN = data['access_token']['oauth_token'] 
   ASECRET = data['access_token']['oauth_token_secret']
   auth = OAuthHandler(CKEY,CSECRET)
   auth.set_access_token(ATOKEN, ASECRET)
   api = tweepy.API(auth)
   if tweetID > 0:
      try:
         tweet = api.create_favorite(id=tweetID)
         return (tweet.id_str)
      except Exception as e:
         #print(data['access_token']['screen_name'] + ' ' +
         #      e[0][0]['message'])
         return(data['access_token']['screen_name'] + ' ' +
               e[0][0]['message'])
      
   else:
      print("Requerido ID para FAV")
      return("Requerido ID para FAV")

if __name__ == '__main__':
   try:
      arg = sys.argv[1]
   except IndexError:
      arg = None
   return_val = processTweet(arg)
#sudo failt2ban-client set ssh-iptables unbanip 187.161.179.105
