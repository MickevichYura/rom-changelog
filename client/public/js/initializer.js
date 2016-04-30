var initializer = initializer || {};

initializer.initSideBar = function () {
    $(document).ready(function () {
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });
    });
};

initializer.initDatePicker = function () {
    $(document).ready(function () {
        var selector = '.input-group.date';

        $(selector).datepicker({
            format: "dd-mm-yyyy",
            clearBtn: true,
            autoclose: true,
            todayHighlight: true,
            enableOnReadonly: true
        });
        $(selector).datepicker('setDate', new Date());
    });
};
