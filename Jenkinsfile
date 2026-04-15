pipeline {
    agent any

    environment {
        APP_HOST = '54.147.222.96'
        APP_USER = 'ec2-user'
        APP_DIR  = '/home/ec2-user/app'
    }

    stages {
        stage('checkout') {
            steps {
                echo 'Kod je već dohvaćen iz SCM-a.'
            }
        }

        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('test') {
            steps {
                sh 'npm test'
            }
        }

        stage('deploy') {
            steps {
                sh """
                    ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} 'mkdir -p ${APP_DIR}'
                    rsync -avz --delete ./ ${APP_USER}@${APP_HOST}:${APP_DIR}/
                    ssh -o StrictHostKeyChecking=no ${APP_USER}@${APP_HOST} '
                        cd ${APP_DIR} &&
                        npm install &&
                        pm2 delete aws-cicd-app || true &&
                        pm2 start app.js --name aws-cicd-app &&
                        pm2 save
                    '
                """
            }
        }
    }
}
