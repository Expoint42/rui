const express = require('express')
    , router  = express.Router()

// Landing page
router.get ('/',                (req, res, next) => { res.render('index') })
router.get ('/index',           (req, res, next) => { res.render('index') })
router.get ('/managers',        (req, res, next) => { res.render('managers') })
router.get ('/cells',           (req, res, next) => { res.render('cells')  })
router.get ('/cell/edit/:id',   (req, res, next) => { res.render('cellEdit')} )
router.get ('/connections',     (req, res, next) => { res.render('connections' )})
router.get ('/blank',           (req, res, next) => { res.render('blank') })
router.get ('/flot',            (req, res, next) => { res.render('flot') })
router.get ('/morris',          (req, res, next) => { res.render('morris') })
router.get ('/tables',          (req, res, next) => { res.render('tables') })
router.get ('/forms',           (req, res, next) => { res.render('forms') })
router.get ('/panels-wells',    (req, res, next) => { res.render('panels-wells') })
router.get ('/buttons',         (req, res, next) => { res.render('buttons') })
router.get ('/notifications',   (req, res, next) => { res.render('notifications') })
router.get ('/typography',      (req, res, next) => { res.render('typography') })
router.get ('/icons',           (req, res, next) => { res.render('icons') })
router.get ('/grid',            (req, res, next) => { res.render('grid') })

module.exports = router