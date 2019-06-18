(function($) {

	if ($('form').length > 1) {
		hyperform(window, {
			revalidate: 'onsubmit'
		});
	} else {
		hyperform(window);
	};

	hyperform.setRenderer('attachWarning', function(warning, element) {
		var type = element.getAttribute('type');
		if (typeof type == 'string'){
			type = type.toLowerCase();
		}
		element.parentNode.appendChild(warning);
	});

	if ($('#create_password_confirm').length > 0) {

		$('#create_password').change(function() {
			updatePasswordMeter($(this).val());
		});

		$('#create_password').keyup(function() {
			updatePasswordMeter($(this).val());
		});

    function passwordIsValid() {
			var newPassword = document.getElementById('create_password');
			var confirmPassword = document.getElementById('create_password_confirm');
			var isSame = newPassword.value == confirmPassword.value;
			return isSame;
		}

		var newPassword = document.getElementById('create_password');
		var confirmPassword = document.getElementById('create_password_confirm');

		hyperform.addValidator(confirmPassword, function(element) {
			var valid = passwordIsValid();
			element.setCustomValidity(valid ? '' :
				'Passwords must be the same.');
			return valid;
		});
	};

	if ($('#new_password_confirm').length > 0) {

		$('#new_password').change(function() {
			updatePasswordMeter($(this).val());
		});

		$('#new_password').keyup(function() {
			updatePasswordMeter($(this).val());
		});

    function passwordIsValid() {
			var newPassword = document.getElementById('new_password');
			var confirmPassword = document.getElementById('new_password_confirm');
			var isSame = newPassword.value == confirmPassword.value;
			return isSame;
		}

		var newPassword = document.getElementById('new_password');
		var confirmPassword = document.getElementById('new_password_confirm');

		hyperform.addValidator(confirmPassword, function(element) {
			var valid = passwordIsValid();
			element.setCustomValidity(valid ? '' :
				'Passwords must be the same.');
			return valid;
		});
	};



	function updatePasswordMeter(value) {
		var score = zxcvbn(value).score;

		if (score < 1) {
			score = 1;
		};

		if (value == '') {
			score = 0;
		}

		$('._password-items').attr('data-password-strength', score);
	};


	if ($('.registerForm')[0]){

		if (window.location.hash === '#register') {
			$('.loginForm').removeClass('isVisible');
			$('.registerForm').addClass('isVisible');
		}
	};

	$('.remove-item').click(function() {
    var item = $(this);
    $.ajax({
        url: '@Url.Action("DeleteFromCart", "Shop")',
        dataType: 'json',
        type: 'POST',
        cache: false,
        data: {
            schoolId: item.data('school-id'),
            sizeId: item.data('size-id'),
            colourId: item.data('colour-id'),
            styleId: item.data('style-id'),
            WS_Id: item.data('ws-id')
        },
        success: function(result) {
            location.href = result.redirectUrl;
        }
    });
	});

	if ($('.table.-shopping-cart')[0]){

		if($('._body-row').length === 0) {
			$('.emptyCart').addClass('isShowing');
		}

	};





})(jQuery);
