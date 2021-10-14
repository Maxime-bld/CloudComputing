import boto3
import time

sqs = boto3.resource('sqs')

requestQueue = sqs.get_queue_by_name(QueueName='requestQueue')
responseQueue = sqs.get_queue_by_name(QueueName='responseQueue')
message=None
entre=input('Entrer jusque 10 nombre espacé de 1:')
response = requestQueue.send_message(MessageBody=entre)
while(message is None):
    print("wait")  
    for message in responseQueue.receive_messages(MessageAttributeNames=['Author']):
    # Get the custom author message attribute if it was set
        author_text = ''
        if message.message_attributes is not None:
            author_name = message.message_attributes.get('Author').get('StringValue')
            if author_name:
                    author_text = '({0})'.format(author_name)
        # Print out the body and author (if set)
        print('{0}'.format(message.body, author_text))
    
        # Let the queue know that the message is processed
        message.delete()
    time.sleep(5)

    
    