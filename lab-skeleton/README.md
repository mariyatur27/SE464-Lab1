# Lab 1 Skeleton

## Getting started

You'll need to put the following in your .env (keep in mind, never commit this in normal circumstances, and you can delete it from your repo once the file is on your EC2 instance):

```
# AWS RDS
RDS_HOSTNAME=<rds endpoint>
RDS_USERNAME=<master username>
RDS_PASSWORD=<master password>
RDS_PORT=<rds port>
RDS_DATABASE=<rds database name>

# AWS DYNAMODB
AWS_ACCESS_KEY_ID=<your rds access key id>
AWS_SECRET_ACCESS_KEY=<your rds secret access key>
AWS_REGION=us-east-1
```

To do other things while your server is running:

* ctrl+z to stop,
* `bg` to continue in background
* `jobs` to list running tasks in bg
* `fg` to bring back to foreground (it's a stack, you can learn more online)

TO CREATE A SESSION THAT WILL STAY AFTER YOU LOGOUT (search online for more info):

```
screen -S <session-name>
npm start
```

To detach (go back to SSH):

CTRL + A + D

To re-attach (on new SSH session):

```
screen -ls
screen -r <screen name>
```
