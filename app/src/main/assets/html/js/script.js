$(function(){
     $("div.radio").click(function(e) {
        $("input", this).attr("checked") ? null : ($(this).addClass("checked"), $("input", this).attr("checked", !0), $(this).siblings().removeClass("checked").children("input").removeAttr("checked"));
     })
    $('.switch a').on('click',function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if($(target).is(':hidden')) {
            $(this).addClass('active').siblings().removeClass('active');
            $(target).siblings().hide().end().show()
        }
    })

    function formInitial() {
        $('.fieldset input').on('keyup',function() {
            var val = $(this).val(), self = $(this), parent = self.parent();
            if($.trim(val)!=='') {
                parent.find('.ico-delete').addClass('active');
            }
            else{
                parent.find('.ico-delete').removeClass('active');
            }
        })
        $('.fieldset .ico-delete').on('click',function() {
            var self = $(this), parent = self.closest('.fieldset'), input = parent.find('input');
            if(input.val() !== '') {
                input.val('');
                self.removeClass('active');
            }
        }) 

        $('.ico-lock').on('click',function(e) {
            e.preventDefault();
            var self = $(this), parent = self.closest('.fieldset'), input = parent.find('input');
            if(input.attr('type') == 'password') {
                input.attr('type','text');
                self.addClass('ico-unlock');
            }
            else {
                input.attr('type','password');
                self.removeClass('ico-unlock');
            }
        })
    }

    formInitial();

    $('.drop-toggle').on('click', function(e) {
        e.preventDefault();
        var that = $(this), parent = $(this).closest('.drop'), target = parent.find('.dropdown');
        if(target.is(':hidden')) {
            that.addClass('ico-up');
            target.show();
        }else{
            that.removeClass('ico-up');
            target.hide();
        }
    });

    $('.dropdown').on('click',function(e) {
        var self = $(this), parent = self.closest('.fieldset');
        if(e.target.tagName == 'LI') {
            var text = $(e.target).html();
            parent.find('input').val(text);
            parent.find('.drop-toggle').trigger('click');
        }
    });

    // welcome 
    $('.welcome').animate({'top':0,'opacity':1},800).delay(2000).animate({'top':'-3rem','opacity':0.5},800);
})

var target = $('.btn-verify'),
    messages = {
       'count':'重新发送 (<span>10</span>)',
       'countEnd':'获取验证码'
    };

function clicked(el) {
    if(el.hasClass('disabled')) {
        return;
    }
    else {
        el.addClass('disabled').html(messages.count);
        var num = +el.find('span').html();
        count(num,el);
    }
}
function count(t,el) {
    update(t,el);
    if(t && t > 0) {
        t--;
        setTimeout(function(){count(t,el)},1000);
    }
}
function update(text,el) {
    if(text == 0) {
        el.removeClass('disabled').html(messages.countEnd);
    }else {
        text = text > 9 ? text : '0' + text;
        el.find('span').html(text);
    }
}