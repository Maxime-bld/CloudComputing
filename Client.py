import boto3

sqs = boto3.resource('sqs')

requestQueue = sqs.get_queue_by_name(QueueName='requestQueue')
responseQueue = sqs.get_queue_by_name(QueueName='responseQueue')

response = requestQueue.send_message(MessageBody="1 2 3 4 5")

for message in responseQueue.receive_messages(MessageAttributeNames=['Author']):
    # Get the custom author message attribute if it was set
    author_text = ''
    if message.message_attributes is not None:
        author_name = message.message_attributes.get('Author').get('StringValue')
        if author_name:
            author_text = ' ({0})'.format(author_name)
    
    # Print out the body and author (if set)
    print('Hello, {0}!{1}'.format(message.body, author_text))
    
    # Let the queue know that the message is processed
    message.delete()