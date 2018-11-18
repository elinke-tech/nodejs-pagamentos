podTemplate(label: 'nodejs-pagamentos', containers: [
    containerTemplate(
        name: 'jnlp',
        imagePullSecrets: [[$class: 'PodImagePullSecret', name: 'jenkins-registry-credentials']],
        alwaysPullImage: true, 
        image: 'registry.nix.labs/nixlabs/opensource/builders/jnlp-nix', 
        ttyEnabled: true, 
        command: 'cat'),
    containerTemplate(
        name: 'nodejs',
        imagePullSecrets: [[$class: 'PodImagePullSecret', name: 'jenkins-registry-credentials']],
        alwaysPullImage: true, 
        image: 'registry.nix.labs/nixlabs/opensource/builders/nodejs-nix', 
        ttyEnabled: true, 
        command: 'cat'),
    containerTemplate(
        name: 'kubectl',
        imagePullSecrets: [[$class: 'PodImagePullSecret', name: 'jenkins-registry-credentials']],
        alwaysPullImage: true, 
        image: 'registry.nix.labs/nixlabs/opensource/builders/kubectl-nix', 
        command: 'cat', 
        ttyEnabled: true),
    containerTemplate(
        name: 'docker',
        imagePullSecrets: [[$class: 'PodImagePullSecret', name: 'jenkins-registry-credentials']],
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