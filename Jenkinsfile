pipeline {
  agent {
    docker {
      image 'maven'
    }

  }
  stages {
    stage('start') {
      steps {
        sh 'docker pull maven'
      }
    }
  }
}