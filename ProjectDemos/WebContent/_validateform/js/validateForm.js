var MyModule = (function(){
	//
	//all declarations goes here
	var validatingFormName = $("validationForm");
	
	var _exampleForValidatingForm = function(){
		//validate method used to initialize validation plugin with some arguments passed as object
		//valid() is used to call validate function 
		//invalid and success class are custom css classes that are applied when form is invalid and success
		validatingFormName.validate({
			errorClass : "invalid",
			validClass : "success",
			//to remove error that you can see in browser
			onkeyup :  false,
			onfocusout : false,
			rules :{
				//input type name with constraints 
				//<input type= text name= 'resetPassword' id = 'resetPassword'>
				//required means compulsory field and maxlength means length that will accept
				//range[1-20] number : true 
				//for instance if you are validating password and confirm password are same or not
				//use equalTo: "#namethatneedstomatch"
				resetPassword : {
					required:true,
					maxlength:80
				},
				confirmresetPassword: {
					required : true,
					maxlength : 80,
					equalTo : "#resetPassword"
				}
			},
			errorPlacement : function(error,element){
				//insertAfter display error message after every input field 
				//insertBefor 
				//you can also customize where to display error message
				//error.appendTo("#idName"); where <div id="idName"></div>
				error.insertAfter(element);
			},
			showErrors : function(errorMap,errorList){
				//this error will display when you didnt enter all fields
				var NoOfErrors = this.numberOfInvalids();
				if(NoOfErrors > 0){
					_messageSummary("#resetFormMessages","error","Please provide valid " +
							"input for highlighter field(s).");
					this.defaultShowErrors();
				}
			},
			messages : {
				//messages when you entered is invalid
				//for resetpassword field is compulsory if you not enterd in submited 
				//respective attribute error message is displayed
				resetPassword : {
					requried :"Please enter Password"
				},
				confirmresetPassword :{
					requried : "Please enter Password", 
					equalTo : "resetPassword"
				}
			},
			highlight : function(element, errorClass,
					validClass) {
				if ($(element).hasClass(errorClass)) {
					$(element).removeClass(errorClass);
				}
				setTimeout(function() {
					$(element).addClass(errorClass);
				}, 10);
			},
			unhighlight : function(element, errorClass,
					validClass) {
				$(element).removeClass(errorClass);
			},
			submitHandler : function() {
				//this will execute only when all fields are valid 
				$("#resetPassword").removeClass("invalid");
				var resetPasswordValue = $("#resetPassword").val();
				var forgotRoleValue = $("#forgotrole").val();
				var forgotusernameValue = $('#forgotusername').val();
				var expireIDValue = $('#expireID').val();
				var form = resetPasswordForm;
				if (form.valid()) {
					form.validate().resetForm();
				}
				// this is isLoading plugin that will show loading until response comes
				$.isLoading({
					text : "Loading"
				});
				
				 $.ajax({
                     url: siteContextPath
                     + '/recoverPassword',
                     type: 'POST',
                     data: {
                         action: "resetPassword",
                         resetPassword: resetPasswordValue,
                         forgotRole: forgotRoleValue,
                         forgotUserName: forgotusernameValue,
                         expireID : expireIDValue
                     },
                     dataType: "text",
                     success: function (data) {
                     	var data = JSON.parse(data);
                         var response = data.Response;
                         
                         if (response.type == "success") {
                        	 $("#resetPassword").val("");
                        	 $("#confimresetPassword").val("");
                        	 _messageSummary(
										"#resetFormMessages",
										response.type,
										response.message);
                        	
                        	 $.isLoading("hide");
                         }else if (response.type = "error") {
                        	 $("#resetPassword").val("");
                        	 $("#confimresetPassword").val("");
                        	 _messageSummary(
										"#resetFormMessages",
										response.type,
										response.message); 
                        	 $.isLoading("hide");
                         }else if (response.type = "warning") {
                        	 $("#resetPassword").val("");
                        	 $("#confimresetPassword").val("");
                        	 _messageSummary(
										"#resetFormMessages",
										response.type,
										response.message); 
                        	 $.isLoading("hide");
                         }
                     },

                     error: function (data) {
                    	 _messageSummary(
									"#resetFormMessages",
									response.type,
									response.message); 
                    	 $.isLoading("hide");
                     }
                 
						
						
					});
				
			}	
		
			
		});
		
	};
	return {
		init: function(){
			//all events declare here
			//function that need to call once should declare here
			_exampleForValidatingForm();
		}
	};
}());
//you can call init method here or from JSP page
$(document).ready(resetPassword.init);