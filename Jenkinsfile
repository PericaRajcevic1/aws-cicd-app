pipeline {
    agent any

    environment {
        APP_HOST = '3.94.161.155'
        APP_USER = 'ec2-user'
        APP_DIR  = '/home/ec2-user/docker-app'
        IMAGE_NAME = 'todo-app-test'
    }

    stages {
        stage('checkout') {
            steps {
                echo 'Kod je već dohvaćen iz SCM-a.'
            }
        }

        stage('build') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('test') {
            steps {
                sh '''
                    docker rm -f test-app || true
                    docker run -d --name test-app -p 3001:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
                    sleep 10
                    curl -f http://localhost:3001 | grep "Perica Rajčević"
                    docker rm -f test-app
                '''
            }
        }

        stage('deploy') {
            steps {
                sh '''
                    ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} "mkdir -p ${APP_DIR}"
                    rsync -avz --delete ./ ${APP_USER}@${APP_HOST}:${APP_DIR}/
                    ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} "
                        cd ${APP_DIR} &&
                        docker compose down || true &&
                        docker compose up -d --build
                    "
                '''
            }
        }
    }
}
