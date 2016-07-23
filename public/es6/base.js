/**
 * Created by WesternRanger on 16/5/12.
 */
$('.col-bar').on('click',function(){
    $('.nav-bar').toggleClass('cs_hide');
});
let docHei = +$('body,html').height(),
    $footer = $('div.footer'),
    winHei = +$(window).height();

if(winHei>docHei+138){
    $footer.css({
        'position':'absolute',
        'bottom':0,
        'left':0
    });
}
