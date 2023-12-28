
module.exports = [
    {
        label: 'Teldoo POS',
        submenu: [
            {label : 'Home', click : () => { require('./main')("home") }},
            {label : 'À propos', click : () => { require('./main')("about") }},
            {label : 'Quitter', role : 'quit'},
        ]
    },
]
