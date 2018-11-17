{
podTemplate(label: 'nodejs-pagamentos', containers: [
    containerTemplate(
        withDockerRegistry(credentialsId: 'a766dad6-a5e6-44f2-9a24-a283c3c428ed', url: 'registry.gitlab.com'),
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
    hostPathVolume(mountPath: '/root/.kube/config', hostPath: '/home/felipe/kubectl-slaves-config/config') 
  ]
) 
    node('nodejs-pagamentos') {
        stage('Check running containers') {
            withDockerRegistry(credentialsId: 'a766dad6-a5e6-44f2-9a24-a283c3c428ed', url: 'registry.gitlab.com') {
                container('docker') {
                    sh "docker pull"
                }
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