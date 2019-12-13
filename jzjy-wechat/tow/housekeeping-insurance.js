/*
$(function() {
	$(".housekeepingBtn").on("click", function() {
		if(jzjy.getTokenSkip()) {
			jzjy.ajax({
				params: {
					phone: jzjy.getMobile(),
				},
				async: false,
				url: "insurance/verifyInsurance"
			}, function(data) {
				if(data.code == 0) {
					console.log(data);
					if(data.data.custList.length > 0) {
						goto("../insurance/my-insurance.html") //雇主
					} else if(data.data.staffList.length > 0) {
						goto("../insurance/my-insurance-perfect.html") //服务人员

					} else {
						goto("../insurance/select-roles.html")
					}

				} else {

				}

			});
		}
	})
})*/
