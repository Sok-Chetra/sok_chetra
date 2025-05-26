module.exports = {
    apps: [
        {
            name: 'sok_chetra',
            script: 'npm',
            args: 'run start', // Runs "npm run start"
            cwd: '/var/www/html/sok_chetra', // Ensure this path is correct
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};