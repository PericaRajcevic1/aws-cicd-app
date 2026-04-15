pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                git 'https://github.com/TVOJ_USERNAME/aws-cicd-app.git'
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
                echo 'Deploy step (kasnije ćemo dodati pravi deploy)'
            }
        }
    }
}
