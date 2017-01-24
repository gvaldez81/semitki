from __future__ import print_function
import sys
import datetime
import traceback
import httplib2
import os
from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools
import base64
import mimetypes
from email.mime.text import MIMEText
from caecUploader import upload

stdOut = sys.stdout
f = file('salidas/soundcloud_'+datetime.datetime.now().strftime("%Y-%m-%d %H:%M")+'.txt', 'w')
sys.stdout = f

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose'
CLIENT_SECRET_FILE = 'client_gmail.json'
APPLICATION_NAME = 'Gmail API Python Quickstart'


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'gmail-python-quickstart.json')

    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

def sendError(service, fromE, toE, date, msgError):
    try:
       bodyTxt = MIMEText('EL CORREO RECIBIDO DE %s DE FECHA %s NO HA PODIDO %s ' % (toE, date, msgError))
       bodyTxt['to'] = fromE
       bodyTxt['from'] = fromE
       bodyTxt['subject'] = 'ERROR AL PUBLICAR AUDIO'
       bodyMsg = {'raw': base64.urlsafe_b64encode(bodyTxt.as_string())}
       aviso = (service.users().messages().send(userId='me', body=bodyMsg).execute())
       print ('Correo de ERROR enviado. Email Id: %s' % aviso['id'])
    except Exception as e:
       print(e)
       print(traceback.format_exc())
    finally:        
       return 'exitoso'


def markAsRead(service, msgID):
    retVal=''
    try:
       print('Marcando correo como LEIDO')
       msgLabels = {'removeLabelIds': ['UNREAD'], 'addLabelIds': []}
       message = service.users().messages().modify(userId='me', id=msgID,body=msgLabels).execute()
       print('*Correo Actualizado*')
       retVal='exitoso'
    except Exception as e:
       print(e)
       print(traceback.format_exc())
       retVal='error'
    finally:        
       return retVal

def sendNotification(service, msgID, trackURL, fromE, toE, date, subject):
    try:
       if markAsRead(service, msgID)=='error':
           print('*** NO PUDO DESMARCARSE EL EMAIL ***')
           sendError(service, fromE, toE, date, 'NO PUDO MARCARSE COMO LEIDO')
       print('Informando al remitente de la publicacion')
       if subject=='vacio':
          bodyTxt = MIMEText('Su correo electronico se recibio sin archivo adjunto. Revise')
          bodyTxt['subject'] = 'Audio No Adjuntado'
       else:
          bodyTxt = MIMEText('Su audio esta publicado en la URL = '+trackURL)
          bodyTxt['subject'] = 'Audio Publicado'
       bodyTxt['to'] = toE
       bodyTxt['from'] = fromE
       bodyMsg = {'raw': base64.urlsafe_b64encode(bodyTxt.as_string())}
       print(fromE+'_'+toE)
       aviso = (service.users().messages().send(userId='me', body=bodyMsg).execute())
       print ('Correo enviado. Email Id: %s' % aviso['id'])
       retVal='exitoso'
    except Exception as e:
       print(e)
       print(traceback.format_exc())
       retVal='error'
    finally:        
       return retVal

def downloadFile(service, msgID, part):
    path=''
    try:
       if 'data' in part['body']:
          data=part['body']['data']
       else:
          att_id=part['body']['attachmentId']
          att=service.users().messages().attachments().get(userId='me', messageId=msgID,id=att_id).execute()
          data=att['data']
       file_data = base64.urlsafe_b64decode(data.encode('UTF-8'))
       path = ''.join(['/home/gerri/soundcloud/',str(msgID)])
       with open(path, 'w') as f:
          f.write(file_data)
       f.close()
    except Exception as e:
       print(e)
       print(traceback.format_exc())
       path='error'
    finally:        
       return path

def processMsg(service, message):
    try:
       print ('---PROCESANDO---')
       print ('Message ID = '+message['id'])
       email = service.users().messages().get(userId='me', id=message['id']).execute()
       date =email['payload']['headers'][2]['value'] 
       print('Fecha = ' + str(datetime.datetime.fromtimestamp(int(email['internalDate'])/1000.0)))
       fromE = 'gvaldez@gmail.com'
       toE = email['payload']['headers'][3]['value']
       toE = toE.replace("<", "")
       toE = toE.replace(">", "")
       print('email = ' + toE)
       print('body = ' + base64.urlsafe_b64decode(email['payload']['parts'][0]['parts'][0]['body']['data'].encode('UTF-8')))
       body = base64.urlsafe_b64decode(email['payload']['parts'][0]['parts'][0]['body']['data'].encode('UTF-8'))
       params = body.splitlines()
       path = ''
       for part in email['payload']['parts']:
          if part['filename']:
             print('Descargando archivo :'+part['filename'])
             path = downloadFile(service , message['id'], part)
       if path is not None and path != '':
          print('Archivo descargado : '+path)
          try:
             description = params[0]
          except IndexError:
             description = ''
          try:
             network = params[1]
             network = network.lower()
          except IndexError:
             network = 'SINRED' 
          try:
             privacy = params[2]
          except IndexError:
             privacy = 'public'  
          result = upload(description, network, privacy, path)
          if result != 'error':
              sendNotification(service, message['id'], result, fromE, toE,date, 'subido')
          else:
              print('*** NO PUDO REALIZARSE LA PUBLICACION EN SOUNDCLOUD ***')
              sendError(service, fromE, toE, date, 'NO PUDO PUBLICARSE EN SOUNDCLOUD')
       else:
          print('Email sin archivo adjunto')
          sendNotification(service, message['id'], '', fromE, toE,date, 'vacio')
       
       retVal='exitoso'
    except Exception as e:
       print(e)
       print(traceback.format_exc())
       retVal='error'
    finally:        
       return retVal

def main():
    """Shows basic usage of the Gmail API.

    Creates a Gmail API service object and outputs a list of label names
    of the user's Gmail account.
    """
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('gmail', 'v1', http=http)

    results = service.users().labels().list(userId='me').execute()
    response = service.users().messages().list(userId='me',
                                               q='is: label:unread label:inbox subject:soundcloud').execute()
    messages = []
    if 'messages' in response:
      messages.extend(response['messages'])

    while 'nextPageToken' in response:
      page_token = response['nextPageToken']
      response = service.users().messages().list(userId='me', q=query,pageToken=page_token).execute()
      messages.extend(response['messages'])
    for message in messages:
      result = processMsg(service, message)  

if __name__ == '__main__':
    main()

sys.stdout = stdOut
f.close()

