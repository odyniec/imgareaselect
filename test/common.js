function dim(element, shift) {
    if (!shift) shift = 0;
    
    return {
        x1: Math.round($(element).offset().left + shift),
        y1: Math.round($(element).offset().top + shift),
        x2: Math.round($(element).offset().left + $(element).width() + shift),
        y2: Math.round($(element).offset().top + $(element).height() + shift)
    };
}

function testCleanup() {
    $('#t').empty();
}

(function ($) {
    
$.handlerException = function (element, eventType, fnFailure, fnSuccess) {
    var jQueryBind, jQueryOne, _fnFailure, _fnSuccess;

    if (fnFailure) {
        if (!jQueryBind) {
            jQueryBind = $.fn.bind;
            jQuery.fn.handlerExceptionBind = $.fn.bind;
            jQueryOne = $.fn.one;
        }
        
        //_fnFailure = fnFailure;
        //_fnSuccess = fnSuccess;
    
        $.fn.bind = function (type, data, fn) {
            var handler;
            
            if (this.get(0) != element.get(0))
                return this.handlerExceptionBind(type, data, fn);
            
            if (jQuery.isFunction(data))
                handler = data;
            else if (jQuery.isFunction(fn))
                handler = fn;
            else
                return this.handlerExceptionBind(type, data, fn);
            
            return this.handlerExceptionBind(type, data, function (event) {
                    try {
                        var ret = handler.apply(this, arguments);
                        //_
                        if (fnSuccess)
                            //_
                            fnSuccess.call();
                        return ret;
                    }
                    catch (e) {
                        //_
                        fnFailure(e);
                    }
                });
        };
    }
    else {
        if (jQueryBind) {
            $.fn.bind = jQueryBind;
            $.fn.one = jQueryOne;
        }
    }
}

})(jQuery);