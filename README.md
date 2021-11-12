# CloudComputing Project Lab2
Group members : Aurélien ARBARETAZ, Maxime BALLOUARD, Aleksander GAUTIER, Jinda WU

This project is a "hot-dog" application using AWS. The goal of this app is to enable users to label images by telling whether an image represents a hot dog or not. The application is in the form of a website, where 4 images associated to checkboxes are presented. The user must then tick the corresponding checkbox if the image is an hotdog and leave it blank if it isn't. A validate button is available when the labelling is over along with an "upload" button allowing users to add their own image to the database.

The images are stored on an amazon S3 bucket managed by an EC2 instance. Each time a set of images is labeled, a text file stored in the S3 bucket is updated to keep track of all the labels and the associated images. 
