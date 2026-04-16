pipeline {
    agent any

    environment {
        APP_HOST = '3.94.161.155'
        APP_USER = 'ec2-user'
        APP_DIR  = '/home/ec2-user/docker-app'
        IMAGE_NAME = 'student-web'
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
                    docker run --rm ${IMAGE_NAME}:${BUILD_NUMBER} sh -c "
                        nginx -t &&
                        grep -q 'Perica Rajčević' /usr/share/nginx/html/index.html
                    "
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
