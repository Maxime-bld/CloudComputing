import boto3

sqs = boto3.resource('sqs')

requestQueue = sqs.get_queue_by_name(QueueName='requestQueue')
responseQueue = sqs.get_queue_by_name(QueueName='responseQueue')
message=None
while(True):
    for message in requestQueue.receive_messages(MessageAttributeNames=['Author']):
        # Get the custom author message attribute if it was set
        author_text = ''
        if message.message_attributes is not None:
            author_name = message.message_attributes.get('Author').get('StringValue')
            if author_name:
                author_text = ' ({0})'.format(author_name)
        Stringlist=message.body.split()
        Intlist=list(map(int, Stringlist))
        # vérification de la validité des données d'entré
        if len(Intlist)>=10 :
            print("il y a plus de 10 entier")
        else :
            for i in Intlist :
                if i<0 :
                    print("l'un des nombre est negatif")
        ## ----------------------------------- | fonction de calculs | ----------------------------------- ##
        # calcule de la somme
        sum=0
        for t in Intlist:
            sum=sum+t
        print(sum)
        moy=sum/len(Intlist)
        print(moy)

        # calcule du minimum et du maximum
        max = Intlist[0]
        min = Intlist[0]
        for i in Intlist :
            if i < min :
                min = i
            if i > max :
                max = i
        result = '''Resultat pour {0} :
    Somme = {1}
    Moyenne = {2}
    Min = {3}
    Max = {4}'''.format(message.body,sum,moy,min,max)
        response = responseQueue.send_message(MessageBody=result)
        # Print out the body and author (if set)
        print('{0}'.format(message.body, author_text))
        
        # Let the queue know that the message is processed
        message.delete()



