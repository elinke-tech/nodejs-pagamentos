podTemplate(label: 'nodejs-pagamentos', containers: [
    containerTemplate(
        name: 'nodejs', 
        image: 'registry.gitlab.com/nixlabs/opensource/builders/nodejs-nix', 
        ttyEnabled: true, 
        command: 'cat'),
    containerTemplate(
        name: 'kubectl', 
        image: 'registry.gitlab.com/nixlabs/opensource/builders/kubectl-nix', 
        command: 'cat', 
        ttyEnabled: true),
    containerTemplate(
        name: 'docker', 
        image: 'registry.gitlab.com/nixlabs/opensource/builders/docker-nix', 
        command: 'cat', 
        ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    hostPathVolume(mountPath: '/root/.kube/config', hostPath: '/home/felipe/kubectl-slaves-config/config'),
    
  ]
  ) {
    node('nodejs-pagamentos') {
        stage('Check running containers') {
            container('docker') {
                sh 'docker ps'
            }
        }
        
        stage('Clone repository') {
            container('kubectl') {
                sh 'kubectl config view'
            }
        }

        stage('Maven Build') {
            container('nodejs') {
                    sh 'node --version'
            }
        }
    }
}