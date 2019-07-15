module.exports = {
  apps: [
    {
      name: 'pdf-service',
      script: 'node',
      args: '/app/built/index.js',
      env: {
        'NODE_ENV': 'production'
      }
    },
    {
      name: 'chromium',
      script: 'chromium',
      exec_interpreter: 'bash',
      args:
        '--font-render-hinting=medium ' +
        '--enable-font-antialiasing ' +
        '--headless ' +
        '--no-sandbox ' +
        '--disable-setuid-sandbox ' +
        '--disable-gpu ' +
        '--disable-translate ' +
        '--disable-extensions ' +
        '--disable-background-networking ' +
        '--disable-client-side-phishing-detection ' +
        '--disable-background-timer-throttling ' +
        '--disable-sync ' +
        '--single-process ' +
        '--homedir=/tmp ' +
        '--data-path=/tmp/data-path ' +
        '--disk-cache-dir=/tmp/cache-dir ' +
        '--disable-hang-monitor ' +
        '--safebrowsing-disable-auto-update ' +
        '--metrics-recording-only ' +
        '--disable-default-apps ' +
        '--no-first-run ' +
        '--mute-audio ' +
        '--hide-scrollbars ' +
        '--remote-debugging-port=9222'
    }
  ]
}
