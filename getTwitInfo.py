import sys
import tweepy
from tweepy import OAuthHandler


CKEY = 'QhIyjwrn8SKnx06emlYLBLrm4'
CSECRET = '0UPpJHQdFojZxg4B3onsZ6If5n7AEbF9KzOOGAOX57q4WXH2UN'
ATOKEN = '1967326028-cWX2F3Xxqzu5C0p4gJeKehhQjGfmJNKFXb1oScT'
ASECRET = 'SRhuP1l9U1pUijq0ePpzPE8ssmeWLylnMP2Wr7ZPtRp4P'
def getInfo(tweetID):
   
   auth = OAuthHandler(CKEY,CSECRET)
   auth.set_access_token(ATOKEN, ASECRET)
   api = tweepy.API(auth)
   retVal = api.get_status(tweetID)
   print('Usuario :' + retVal.author.screen_name)
   print('Likes :' + str(retVal.favorite_count))
   print('RTs :' + str(retVal.retweet_count))
   print('Copy :' + retVal.text.encode('utf-8'))

if __name__ == '__main__':
   try:
      arg = sys.argv[1]
   except IndexError:
      arg = None
   return_val = getInfo(arg)