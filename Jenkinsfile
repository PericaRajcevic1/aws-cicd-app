pipeline {
    agent any

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
                echo 'Deploy step cemo dodati nakon sto pripremimo drugu EC2 instancu.'
            }
        }
    }
}
