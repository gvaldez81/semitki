#los imports necesarios 
#json para leer las credenciales [pip install json]
#gspread para leer google sheet [pip install gspread]
#oauth2client para loguearnos en googledrive [pip install oauth2client]
import traceback
import json
import gspread
from oauth2client.client import SignedJwtAssertionCredentials
import datetime
from twitterAction import processTweet
from facebookAction import processPost
import sys
from accounts import getTwitterAccounts

#stdOut = sys.stdout
#f = file('salidas/'+datetime.datetime.now().strftime("%Y-%m-%d %H:%M")+'.txt', 'w')
#sys.stdout = f



def process(filename):
   try:
      


      #Cargamos el archivo json conteniendo las credenciales
      json_key = json.load(open('RSController-3a5a085f4225.json'))
      #Definimos el alcance
      scope = ['https://spreadsheets.google.com/feeds']
      #Definimos Credenciales
      credentials = SignedJwtAssertionCredentials(json_key['client_email'], json_key['private_key'].encode(), scope)
      #Logueamos en Google Drive
      gc = gspread.authorize(credentials)
      if filename is not None:
         sh = gc.open(filename)
      else:
         #Abrimos el Sheet correcto dependiendo del mes actual (Numero)
         sh = gc.open(datetime.datetime.now().strftime("%m")+'_'+datetime.datetime.now().strftime("%y"))
      
      #Abrimos el worksheet correcto  dependiendo del dia actual (Numero)
      ws = sh.worksheet(datetime.datetime.now().strftime("%d"))
      
      # query = "findme"
      # worksheet = worksheet_object
      # first_column = worksheet.range("A1:A{}".format(worksheet.row_count)
      # found_cell_list = [found for found in first_column if found.value == query]

      cellList = ws.range('A2:A100')
      firstRow = ''
      for cell in cellList:
         if cell.value == 'PENDIENTE' and firstRow == '':
            firstRow = cell.row
         if cell.value == '':
            break 
         lastRow = cell.row
      if firstRow == '' :
         print('Nada que realizar. Antes de la primer celda vacia no hay celdas marcadas como Pendiente')
      else:
         cuentas, grupos = getTwitterAccounts();
         for rowPos in range(firstRow, lastRow+1):
            row = ws.row_values(rowPos)
            if datetime.datetime.now().time()>datetime.datetime.strptime(row[1],'%H:%M').time():
               if not None in {row[0], row[1], row[3], row[4]}:
                  if (row[4] == 'INTERNO' and row[5] is not None) \
                     or (row[4]=='EXTERNO' and row[6]!= None ):
                     result = ''
                     if row[3] == 'Twitter':
                        result = processTweet(row, cuentas, grupos)
                        print(result) 
                     elif row[3] == 'Facebook':
                        #result = processPost(row)
                        print(row) 
                     if result == 'error':
                        print('error')
                        #ws.update_cell(rowPos, 1, 'ERROR')   
                     else:
                        print('ok')
                        ws.update_cell(rowPos, 13, result)
                        ws.update_cell(rowPos, 1, 'LISTO' )
                  else:
                     print('Se omitieron cuenta o ID') 
               else:
                  print('Se omitieron algunos campos necesarios para hacer el procesamiento')
               print('------------------')
            else:
               print('Publicacion programada para '+row[1])
   except gspread.SpreadsheetNotFound as e:
      print('No existe Spreadsheet del mes: '+str(e))
   except gspread.WorksheetNotFound as e:
      print('No existe Worksheet del dia: '+str(e))
   except Exception as e:
      print(e)
      print(traceback.format_exc())


if __name__ == '__main__':
   try:
      arg = sys.argv[1]
   except IndexError:
      arg = None
   return_val = process(arg)

#finally:        
#   sys.stdout = stdOut
#   f.close()

#sudo pip install oauth2client
#sudo pip install MySQLdb
#sudo pip install PyOpenSSL
#sudo pip install gspread
#sudo pip install facepy
#sudo pip install tweepy
#sudo yum install libffi-devel

#worksheet.update_acell('B1', 'Bingo!')
#      try:
#          print('Horario='+(row[1] or 'empty'))
#      except IndexError:
#          print('Horario No Definido')
#      try:       
#          print('RED='+(row[3] or 'empty'))
#      except IndexError:
#          print('RED=empty')
#      try:       
#          print('Cuenta='+(row[4] or 'empty'))
#      except IndexError:
#          print('Cuenta=empty')
#      try:       
#       print('Copy='+(row[5] or 'empty'))
#      except IndexError:  
#          print('Copy=empty')
#      try:
#       print('Link='+(row[6] or 'empty'))
#      except IndexError:
#          print('Link=empty')
#      try:
#          print('Imagen='+(row[7] or 'empty'))
#      except IndexError:
#          print('Imagen=empty')
#for pos in range(8, len(row)):
#         print('Cuenta a dar RT/Share Num'+str(pos)+' = '+(row[pos] or 'empty'))
