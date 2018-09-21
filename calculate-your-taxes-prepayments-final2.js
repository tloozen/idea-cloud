// Calculate 21092018

// (function init() {
	var resultsCalculation;
        // Variables declaration based on user input
        var status;
        var estimation;
        var a1;
        var a2;
        var a3;
        var a4;
        var precompte;

        // Variables declaration based on excel file

        var minPc = 0.005;
        var minAmt = 80;

        var baseSelfEmp = 1.06;
        var baseMajSelfEmp = 0.90;
        var tauxMajSelfEmp = 0.0225;
        var VAI1SelfEmp = 0.03;
        var VAI2SelfEmp = 0.025;
        var VAI3SelfEmp = 0.02;
        var VAI4SelfEmp = 0.015;
        var Bonif1SelfEmp = 0.015;
        var Bonif2SelfEmp = 0.0125;
        var Bonif3SelfEmp = 0.01;
        var Bonif4SelfEmp = 0.0075;

        var baseCie = 1.03;
        var baseMajCie = 1;
        var tauxMajCie = 0.0675;
        var VAI1Cie = 0.09;
        var VAI2Cie = 0.075;
        var VAI3Cie = 0.06;
        var VAI4Cie = 0.045;
        var Bonif1Cie = 0;
        var Bonif2Cie = 0;
        var Bonif3Cie = 0;
        var Bonif4Cie = 0;

        var form = document.querySelector('.form-calculate');

        form.addEventListener('submit', function(e) {

        	e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            // GET DOM ELEMENTS

            var errorStatusHTMLElement;
            var errorEstimationHTMLElement;
            var profile1HTMLInputElement;
            var profile2HTMLInputElement;
            var estimatePaytax;
            var needPay_1;
            var needPay_2;
            var needPay_3;
            var needPay_4;
            var duties;
            var resultFirstHTMLElement
            var resultSecondHTMLElement
            var resultThird
            var resultFourth
            var resultBlock;
            var resetCalculationBtnHTMLElement;

            try {
            	errorStatusHTMLElement = document.querySelector('.alert.alert-danger.error');
            	errorEstimationHTMLElement = document.querySelector('.alert.alert-danger.error2');
            	profile1HTMLInputElement = document.getElementById('profile_1');
            	profile2HTMLInputElement = document.getElementById('profile_2');
            	estimatePaytax = Number(document.getElementById('estimatePayTax'));
            	needPay_1 = Number(document.getElementById('needPay_1'));
            	needPay_2 = Number(document.getElementById('needPay_2'));
            	needPay_3 = Number(document.getElementById('needPay_3'));
            	needPay_4 = Number(document.getElementById('needPay_4'));
            	duties = Number(document.getElementById('duties'));
            	resultBlock = document.querySelector('.result-block');
            	resetCalculationBtnHTMLElement = document.querySelector('.btn.btn-ing-product.reset_button');
            } catch (err) {
            	console.error(err) 
            }

            // logic 

            status = getStatus(profile1HTMLInputElement);

            if (!showErrorCheckBox(status, errorStatusHTMLElement) && !showErrorEstimatePaytax(estimatePaytax, errorEstimationHTMLElement)) {

            	resultsCalculation = calculate(status, estimatePayTax, needPay_1, needPay_2, needPay_3, needPay_4, duties)
            	alert(status, estimatePayTax, needPay_1, needPay_2, needPay_3, needPay_4, duties)
            	if (status === "selfEmployed") {
            		showResultValues("selfEmployed")
            	} else {
            		showResultValues("company")
            	}
            }    
            
                        // Events
                        resetCalculationBtnHTMLElement.addEventListener('click', resetForm());

            //----------------------------------------------------------------

            //----------------------------------------------------------------


            function showResultValues(statusAsString) {
            	resultFirstHTMLElement = document.getElementById('result_1');
            	resultSecondHTMLElement = document.getElementById('result_2');
            	resultThird = document.getElementById('result_4'); 
            	resultFourth = document.getElementById('result_5');

            	switch (statusAsString) {
            		case "selfEmployed":
            		resultFirstHTMLElement.innerText = Number(resb13).toFixed(2);
            		resultSecondHTMLElement.innerText = Number(resb15).toFixed(2);
            		resultThird.innerText = Number(resb18).toFixed(2);
            		resultFourth.innerText = Number(resb13).toFixed(2);
            		break;

            		case "company":
            		resultFirstHTMLElement.innerText = Number(resc13).toFixed(2);
            		resultSecondHTMLElement.innerText = Number(resc15).toFixed(2);
            		resultThird.document.innerText = Number(resc18).toFixed(2);
            		resultFourth.document.innerText = Number(resc13).toFixed(2);
            		break;

            		default:
            		break;
            	}

            }

            function showErrorCheckBox(status, HTMLElementToDisplayError) {
            	var error = false;
            	if (HTMLElementToDisplayError instanceof HTMLElement) {
            		if (status === "error") {
            			HTMLElementToDisplayError.style.display = 'block'
            			error = true;
            		} else {
            			HTMLElementToDisplayError.style.display = 'none'
            		}
            	}
            	return error;
            }

            function showErrorEstimatePaytax(estimatePaytax, HTMLElementToDisplayError) {
            	var error = false;
            	if (HTMLElementToDisplayError instanceof HTMLElement && estimatePaytax > 0) {
            		errorEstimationHTMLElement.style.display = 'none';
            	} else {
            		errorEstimationHTMLElement.style.display = 'block';
            		error = true;
            	}
            	return error;
            }

            function resetForm() {
            	hideError();
            	hideResult();
            	resetUserValues();
            };

            function resetUserValues() {
            	estimation = 0;
            	a1 = 0;
            	a2 = 0;
            	a3 = 0;
            	a4 = 0;
            	precompte = 0;
            	resultThird = 0;
            	resultFourth = 0;
            };

            function hideError() {
            	errorStatusHTMLElement.style.display = 'none';
            	errorEstimationHTMLElement.style.display = 'none';
            }

            function getStatus(HTMLInputElement) {
            	var status;
            	try {
            		if (HTMLInputElement.checked) {
            			status = "selfEmployed";
            		} else {
            			status = "company";
            		}
            	} catch (err) {
            		status = "error";
            		console.error(err);
            	}
            	return status;
            }

            function showResult() {
            	resultBlock.style.display = 'block';
            }

            function hideResult() {
            	resultBlock.style.display = 'none';
            }

           /*function showResultValues() {
                try {
                    resultFirstHTMLElement = document.getElementById('result_1');
                    resultSecondHTMLElement = document.getElementById('result_2');
                    resultThird = document.getElementById('result_3');
                    resultFourth = document.getElementById('result_4');
                    resultFirstHTMLElement.innerText = Number(res13).toFixed(2);
                    resultSecondHTMLElement.innerText = Number(res15).toFixed(2);
                    resultThird.document.innerText = Number(res18).toFixed(2);
                    resultFourth.document.innerText = Number(res13).toFixed(2);
                } catch (err) {
                    console.error(err);
                }    
            }*/
            
            function calculate(status, estimation, a1, a2, a3, a4, precompte) {
            	estimation = Number(document.getElementById('estimatePayTax').value);
            	a1 = Number(document.getElementById('needPay_1').value);
            	a2 = Number(document.getElementById('needPay_2').value);
            	a3 = Number(document.getElementById('needPay_3').value);
            	a4 = Number(document.getElementById('needPay_4').value);
            	precompte =  Number(document.getElementById('duties').value);

            	estimation = estimation || 0;
            	a1 = a1 || 0;
            	a2 = a2 || 0;
            	a3 = a3 || 0;
            	a4 = a4 || 0;
            	precompte = precompte || 0;

                // calculation
                var resb13 = (((estimation * baseSelfEmp) - precompte) * tauxMajSelfEmp * baseMajSelfEmp).toFixed(2);
                var resb14 = (a1 * VAI1SelfEmp + a2 * VAI2SelfEmp + a3 * VAI3SelfEmp + a4 * VAI4SelfEmp).toFixed(2);
                var resb15 = ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resb14) * baseMajSelfEmp).toFixed(2);
                var resb16 = (function() {
                	if ((a1 + a2 + a3 + a4) > 0) {
                		var condition1 = (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resb14) * baseMajSelfEmp < (minPc * (estimation * baseSelfEmp - precompte));
                		if (condition1) {
                			return "0.00";
                		} else {
                			var condition2 = (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resb14) * baseMajSelfEmp < minAmt;
                			if (condition2) {
                				return "0.00";
                			} else {
                				return ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resb14) * baseMajSelfEmp).toFixed(2);
                			}
                		};
                	} else {
                		return resb13;
                	};
                }());
                

                var resb18 = (function() {
                	
                	var condition1 = (function() {
                		if (
                			((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) < (minPc * (estimation * baseSelfEmp - precompte)) ||
                			((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) < minAmt
                			) {
                			return true;
                	} else {
                		return false;
                	};
                }());


                	var computed1 = (function getComputedValueFrom() {
                		if (condition1) {
                			return "0.00";
                		} else {
                			return ((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp).toFixed(2);
                		}
                	}());

                	return Math.round(computed1 / VAI1SelfEmp).toFixed(2);
                }())



                var resc13 = ((estimation * baseCie - precompte) * tauxMajCie).toFixed(2);
                var resc14 = (a1 * VAI1Cie + a2 * VAI2Cie + a3 * VAI3Cie + a4 * VAI4Cie).toFixed(2);
                var resc15 = (((estimation * baseCie - precompte) * tauxMajCie) - resc14).toFixed(2);
                var resc16 = (function() {
                	if (a1 + a2 + a3 + a4 > 0) {
                		var condition1 = ((estimation - precompte) * tauxMajCie) - resc14 < (minPc * (estimation - precompte));
                		if (condition1) {
                			return "0.00";
                		} else {
                			var condition2 = ((estimation - precompte) * tauxMajCie) - resc14 < minAmt;
                			if (condition2) {
                				return "0.00";
                			} else {
                				return (((estimation - precompte) * tauxMajCie) - resc14).toFixed(2);
                			}
                		}
                	} else {
                		return resc13;
                	}
                }());
                var resc18 = (function() {
                	var condition1 = (estimation - precompte) * tauxMajCie < (minPc * (estimation - precompte));
                	var condition2 = (((estimation - precompte) * tauxMajCie) < minAmt);

                	if (condition1 || condition2) {
                		return "0.00";
                	} else {
                		return (((estimation - precompte) * tauxMajCie) / VAI1Cie).toFixed(2);
                	}
                }());

                return {
                	selfEmployed: {
                		resb13: resb13,
                		resb14: resb14,
                		resb15: resb15,
                		resb16: resb16,
                		resb18: resb18,
                	},
                	company: {
                		resc13: resc13,
                		resc14: resc14,
                		resc15: resc15,
                		resc16: resc16,
                		resc18: resc18,
                	}

                }
            }
        });
// }());


