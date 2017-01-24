
import httplib2
import sys
import os
import io
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from apiclient.http import MediaIoBaseDownload

# try:
#     import argparse
#     flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
# except ImportError:
#     flags = None

# If modifying these scopes, delete your previously saved credentials
# at ~/.credentials/drive-python-quickstart.json
SCOPES = 'https://www.googleapis.com/auth/drive'
CLIENT_SECRET_FILE = 'client_gdrive.json'
APPLICATION_NAME = 'Python Drive Access'

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
                                   'drive-python-quickstart.json')

    store = Storage(credential_path)
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

def downloadFile(fileName):
    if fileName is None:
        print("Se requiere nombre de archivo")
    else:
        """Shows basic usage of the Google Drive API.

        Creates a Google Drive API service object and outputs the names and IDs
        for up to 10 files.
        """
        credentials = get_credentials()
        http = credentials.authorize(httplib2.Http())
        service = discovery.build('drive', 'v3', http=http)
        page_token = None
        fileFound = False
        while True:
            response = service.files().list(q="name='"+fileName+"' and "+
                                              "'0B71MblGe8VWpN2h3OExvSFNMZ3M' in parents",
                                            spaces='drive',
                                            fields='nextPageToken, files(id, name, parents)',
                                            pageToken=page_token).execute()
            for file in response.get('files', []):
                # Process change
                #print ('Found file: %s (%s)' % (file.get('name'), file.get('id')))
                request = service.files().get_media(fileId=file.get('id'))
                fh = io.FileIO(file.get('name'), 'wb')
                downloader = MediaIoBaseDownload(fh, request)
                done = False
                while done is False:
                    status, done = downloader.next_chunk()
                    #print ("Download %d%%." % int(status.progress() * 100))

            page_token = response.get('nextPageToken', None)
            if page_token is None:
                fileCreated = fileName if len(response.get('files', []))>0 else None
                break;
        #print(int(os.path.getsize(fileCreated))/1024)
        return(fileCreated)

def main(fileName):
    retValue = downloadFile(fileName)
    if retValue is not None:
        print('Archivo descargado')
    else:
        print('No se encontro archivo')


if __name__ == '__main__':
   try:
      arg = sys.argv[1]
   except IndexError:
      arg = None
   return_val = main(arg)

