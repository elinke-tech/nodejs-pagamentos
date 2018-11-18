podTemplate(
    label: 'nodejs-pagamentos', 
    imagePullSecrets: ['jenkins-registry-credentials'],
    alwaysPullImage: true
    containers: [
        containerTemplate(
            name: 'jnlp',
            alwaysPullImage: true, 
            image: 'registry.nix.labs/nixlabs/opensource/builders/jnlp-nix', 
            ttyEnabled: true, 
            command: 'cat'),
        containerTemplate(
            name: 'nodejs',
            alwaysPullImage: true, 
            image: 'registry.nix.labs/nixlabs/opensource/builders/nodejs-nix', 
            ttyEnabled: true, 
            command: 'cat'),
        containerTemplate(
            name: 'kubectl',
            alwaysPullImage: true, 
            image: 'registry.nix.labs/nixlabs/opensource/builders/kubectl-nix', 
            command: 'cat', 
            ttyEnabled: true),
        containerTemplate(
            name: 'docker',
            alwaysPullImage: true, 
            image: 'registry.nix.labs/nixlabs/opensource/builders/docker-nix', 
            command: 'cat', 
            ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    hostPathVolume(mountPath: '/root/.kube/config', hostPath: '/home/felipe/kubectl-slaves-config/config') 
  ]
) {
    node('nodejs-pagamentos') {
        stage('Check running containers') {
                container('docker') {
                    sh "docker pull"
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