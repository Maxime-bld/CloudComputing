import boto3

sqs = boto3.resource('sqs')

requestQueue = sqs.get_queue_by_name(QueueName='requestQueue')
responseQueue = sqs.get_queue_by_name(QueueName='responseQueue')

for message in requestQueue.receive_messages(MessageAttributeNames=['Author']):
    # Get the custom author message attribute if it was set
    author_text = ''
    if message.message_attributes is not None:
        author_name = message.message_attributes.get('Author').get('StringValue')
        if author_name:
            author_text = ' ({0})'.format(author_name)
    testlist=message.body.split()
    sum=0
    for t in testlist:
        sum=sum+int(t)
    print(sum)
    moy=sum/len(testlist)
    print(moy) 
    result = '''Resultat pour {0} :
Somme = {1}
Moyenne = {2}'''.format(message.body,sum,moy)
    response = responseQueue.send_message(MessageBody=result)
    # Print out the body and author (if set)
    print('{0}'.format(message.body, author_text))
    
    # Let the queue know that the message is processed
    message.delete()

test="1 2 3 4 6"
testlist=test.split()
sum=0
for t in testlist:
    sum=sum+int(t)
print(sum)
moy=sum/len(testlist)
print(moy) 