from whatsapp import Client

phone_to = input("Ingrese el Numero: ")
client = Client(login='5218348538420', password='s2znFNoSU7MabzuFHx3qNXaphbY=')
client.send_message(phone_to, 'Ejemplo Mensaje desde eCS Claims')
client.send_media(phone_to, path='/home/gerri/logo.jpg')
client.send_message(phone_to, 'Cualquier comentario comunicarse al numero XXXXXX')
client.send_message(phone_to, 'Esta cuenta de whatsapp no se revisa')

