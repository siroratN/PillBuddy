pipeline {
    agent any

    environment {
        // Define variables
        DOCKER_IMAGE       = 'siroratnambun/pillbuddy:latest'
        DOCKER_CREDENTIALS = credentials('bc992db8-ac96-45e9-9d83-4e64f78e3ed6')
        DB_URL = credentials('DB_URL')
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('clerk_publish')
        CLERK_SECRET_KEY = credentials('clerk_secret')
        NEXT_PUBLIC_CLERK_SIGN_IN_URL = credentials('clerk_signin')
        NEXT_PUBLIC_CLERK_SIGN_UP_URL = credentials('clerk_signup')
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = credentials('clerk_after_signin')
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = credentials('clerk_after_signup')
        NEXT_PUBLIC_TWILIO_ACCOUNT_SID = credentials('twilio_sid')
        NEXT_PUBLIC_TWILIO_AUTH_TOKEN = credentials('twilio_auth')
        NEXT_PUBLIC_URL = credentials('public_url')

    }

    stages {
        stage('Start Jenkins') {
            steps {
                // Checkout your source code from version control
             
                    sh 'echo Start Jenkins............'
                    sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : password = $DOCKER_CREDENTIALS_PSW'
            }
        }

        stage('Build Docker Image') {
            steps {
                    // Build the Docker image
                    
                    dir('./') {
                       sh 'echo "Running in $(pwd)"'
                       sh 'echo start build the Docker image = $DOCKER_IMAGE'
                       sh 'docker build -t $DOCKER_IMAGE .'
                       sh '''
                    docker build \
                    --build-arg DB_URL=$DB_URL \
                    --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
                    --build-arg CLERK_SECRET_KEY=$CLERK_SECRET_KEY \
                    --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL \
                    --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL \
                    --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL \
                    --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL \
                    --build-arg NEXT_PUBLIC_TWILIO_ACCOUNT_SID=$NEXT_PUBLIC_TWILIO_ACCOUNT_SID \
                    --build-arg NEXT_PUBLIC_TWILIO_AUTH_TOKEN=$NEXT_PUBLIC_TWILIO_AUTH_TOKEN \
                    --build-arg NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
                    -t $DOCKER_IMAGE .
                    '''
                    }   
                  
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    // Login to Docker Hub
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    // Push the image
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Clear Docker Components') {
            steps {
                script {
                    // Remove Docker images and containers
                    sh 'docker stop $(docker ps -a -q) || true'  
                    sh  'docker rm $(docker ps -a -q) || true' 
                    sh  'docker rmi $(docker images -q) || true'
                    sh 'docker system prune -af'
                }
            }
        }


        stage('Deploy') {
            steps {
                script {
                    // Pull the Docker image from Docker Hub
                    sh 'docker pull $DOCKER_IMAGE'
                    // Run the Docker container
                    sh 'docker run -d --name pillbuddy-webhook -p 8085:80 $DOCKER_IMAGE'
                    // Pull the Docker image from Docker Hub
                    sh 'docker pull $DOCKER_IMAGE'
                    // Run the Docker container with environment variables
                    sh '''
                    docker run -d --name pillbuddy-webhook \
                    -e DB_URL=$DB_URL \
                    -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
                    -e CLERK_SECRET_KEY=$CLERK_SECRET_KEY \
                    -e NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL \
                    -e NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL \
                    -e NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL \
                    -e NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL \
                    -e NEXT_PUBLIC_TWILIO_ACCOUNT_SID=$NEXT_PUBLIC_TWILIO_ACCOUNT_SID \
                    -e NEXT_PUBLIC_TWILIO_AUTH_TOKEN=$NEXT_PUBLIC_TWILIO_AUTH_TOKEN \
                    -e NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL \
                    -p 8085:80 $DOCKER_IMAGE
                    '''
                }
            }
        }
    }

    post {
        always {
            // Logout from Docker Hub
            sh 'docker logout'
        }
    }
}
