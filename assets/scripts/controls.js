/**
 * Created by ryan on 6/24/16.
 */
$(document).ready(function() {
    document.onkeydown = checkKey;
    var activeInput;
    var activeInputValue;
    var newVal;
    var activeDiv;
    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            activeDiv = $('.active');
            activeDiv.removeClass('active');
            if(activeDiv.hasClass('first')){
                $('.last').addClass('active');
            } else {
                activeDiv.prev().addClass('active');
            }
        }
        else if (e.keyCode == '40') {
            activeDiv = $('.active');
            activeDiv.removeClass('active');
            if(activeDiv.hasClass('last')){
                $('.first').addClass('active');
            } else {
                activeDiv.next().addClass('active');
            }
        }
        else if (e.keyCode == '37') {
            activeInput = $('.active Input');
            activeInputValue = activeInput.val();
            newVal = parseInt(activeInputValue) - 25;
            if(activeInputValue != -1000)
            {
                activeInput.val(newVal);
            }
            changeGain(newVal, activeInput.attr('name'))
        }
        else if (e.keyCode == '39') {
            activeInput = $('.active Input');
            activeInputValue = activeInput.val();
            newVal = parseInt(activeInputValue) + 25;
            if(activeInputValue != 200)
            {
                activeInput.val(newVal);
            }
            changeGain(newVal, activeInput.attr('name'))
        }

    }
});