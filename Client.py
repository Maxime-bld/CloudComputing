import boto3
import time

sqs = boto3.resource('sqs')

requestQueue = sqs.get_queue_by_name(QueueName='requestQueue')
responseQueue = sqs.get_queue_by_name(QueueName='responseQueue')
message=None
# Demande les entrée que nous allons envoyer à la queue de requête
entre=input('Entrer jusque 10 nombre espacé de 1:')
response = requestQueue.send_message(MessageBody=entre)
# Boucle qui attend la réponse
while(message is None):
    # Message d'attente
    print("wait")  
    # Prends le message dans la queue de réponse
    for message in responseQueue.receive_messages():
        # Affiche le body du message de la responseQueue
        print('{0}'.format(message.body))  
        # Dire à la queue qu'elle peut supprimer le message
        message.delete()
    # Tempo avant de request encore
    time.sleep(5)

    
    