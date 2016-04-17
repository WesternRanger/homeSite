var express = require('express'),
    router = express.Router();

router.get('/',(req, resIndex)=> {
    renderPage(resIndex);
});
function renderPage(res){
    res.render('index', {
        title: "从这里开始",
    });
}
module.exports = router;
