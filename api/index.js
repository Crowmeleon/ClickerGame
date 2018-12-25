module.exports = (app) => {
    app.get('/api/data', (req, res) => {
        res.send({data: 'This is an example'})
    })
}