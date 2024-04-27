# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV PORT=3000 \
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"eco-ease","private_key_id":"f834ac961b28e33af15afca5ff8a1eb7e935da0d","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbUsQj+4YGC3Tp\nRX0MVh9AgiELU8eH5mk3zMNsO060Om6lqZfe3zdCpBf8YL3pqhTir5i7ENu2wHE2\neV1nPfHkaAvA1/H7wxybJqC/hYCDjnsRSG727RsYj/TfKkGK5T9/ADP+ahTqKq/U\noO/bmQi3HCyq34Pd7S3bDr1Z3TOWkK7m1uhql1VbQONn24IEGgfN9uvgd3smOoDp\nQe2wM//I3McEPnPxF/Qboqid58lJFJVbCLTZ26KvXeUJK8R2JXIkbhUNSjSSAIwB\nu+31M8TCcar5RvW3iwbpfWsc7757sQNfRawn0EXP1iX4AKMwUMd3N5kyteOuJF5k\nuam5vMt5AgMBAAECggEADuOU8jcQ7qDoBNl4pndV+RbQSJfwG06ivOrXu9cGkR+9\nzgsPCBoBH9X/h52VbuHzLRS0kRAJY8AYSibBpZ0qRCEWKVb59w6JvjSqeZl4S4Qb\nt3koS+rIK2dXS5IvJLubhdbU5Rkxpo3Pe5Qu0e/eRkFA5eNVrm8nM2W7EHN0F8Vh\n73rA/AwlObetSI3pVF4/aRu6xFo/y0NF8Vj/BD/zcXxuyRwt6FKfIePXsazW6Yxr\nPFyYKWwn+jnpSQ3Cr7tzQtRreA4nW5cBbyX2+oJt2GUmjbIqXD3CVtp2NxYJgY+P\nfm5ODdAWXu8sODEIGcBtlzvwtMW0RWNCIomSxzQg9QKBgQDV+7I/2VpCh7Oe6Hnv\nj69lIhQOlNA0HY0LyX0wa7fm6df/Kesr6pbv0ASH/KidjEAXf1xWlzeTPSeSE3ge\nYgL4zQ0XeNL1OE/Y37gXX2Pu/5tAC/97QatRf/FeYfk4MX30MpMhMUOnazCHMqzk\n/xVvliqC0Rl8dfr6cuQff1PLLQKBgQC50mkb+opvm+GpBIsXMh+vcTDQRcuEtUfP\nIqTT36QDio9JwuASKhPJ+Mt9GbjTWyOykQ6qcPXZYEQ4IKPRYCM1L6kv2INK5Jn4\nePLPUpa4UP5ArPebScSBQhwEBz8TYb1pnnVgyuFUdkoxIQYvLgWHjLfh1gbCG6Af\nv4Ul88EA/QKBgQCkb4jo2+QqoBF+GfQqDeag9vEmy2C7y8Gpvyp+3SgzQJwFr3bT\nBrD6lIYG4jfI6hAOfoa82/OPKD2SWXfDEVprS1e2I9kpLB7f7/uNqnYnITFypEWt\nuCcouAMJnoxfjFjYIU1DApKUwyBFpMGMMCGO4HzGjlzhceBuOX/oXHZN+QKBgQCm\nyndwFqV14pxdwmc6jdIk/tuKxmsUFkd7ZCRAzSeByjgtRA8uHriefIPiKVld1Ruo\np01brYLu99qj6qBASiOwFLSu7o+ChMizX5TKhN4mWQSudtLVfxQz1WwiLYLvWbbT\ne9jt5Yz17CtSB8tuQ8fQ0H0o55wvVO6YMKdJ1o4x3QKBgC6fuO+qJV2lmW2IYB7D\nWIEzQRWN7exUOmx72Bdj8kRBZdAOBUjAOQ1pBc7087tJQHYy7s5ay2YISqAeZ2/Y\nNsZCfDelDFOcjIKFwmnbhzKaBfak4LkG8adG3S1xuz8IE05U6m8p8M8TQCxfjHdo\np4l1XDMhkXIYQ0xAksY0T/ML\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-i3s5h@eco-ease.iam.gserviceaccount.com","client_id":"108582497142887783803","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i3s5h%40eco-ease.iam.gserviceaccount.com","universe_domain":"googleapis.com"} \
AUTH_KEY='secretkey' \
SENTRY_DSN='https://a23dd7a73ec2fe16ddefc1ace4d28e78@o923000.ingest.us.sentry.io/4507153216765952'

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start:prod"]
