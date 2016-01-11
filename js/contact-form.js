/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
*/

(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#contact-form');

    $form.submit(function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        var formData = {
            'name' : $('input[name="mauticform[name]"]').val(),
            'email' : $('input[name="mauticform[email]"]').val(),
            'phone' : $('input[name="mauticform[phone]"]').val(),
            'message' : $('textarea[name="mauticform[message]"]').val()
        };

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'http://mautic.twistitlabs.com/index.php/form/submit?formId=1',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            if (!data.success) {
                if (data.errors.name) {
                    $('#name-field').addClass('has-error');
                    $('#name-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.name + '</span>');
                }

                if (data.errors.email) {
                    $('#email-field').addClass('has-error');
                    $('#email-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.email + '</span>');
                }

                if (data.errors.message) {
                    $('#message-field').addClass('has-error');
                    $('#message-field').find('.col-lg-10').append('<span class="help-block">' + data.errors.message + '</span>');
                }
            } else {
                // display success message
                $form.html('<div class="alert alert-success">' + data.message + '</div>');
                dataLayer.push({'event':'gaEvent','gaCat':'Email','gaAct':'submit','gaLabel':'form submited','gaVal':'1'});
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
}(jQuery, window, document));
