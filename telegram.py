from pytg.sender import Sender
sender = Sender("127.0.0.1", port=4458)
msg_to = raw_input("Ingrese el nombre del contacto [firstname_lastname] : ")
sender.send_msg(msg_to,unicode('Hola!'))
