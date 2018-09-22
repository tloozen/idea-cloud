// ING.BE - DAAS - Creation & Optimization squad
// 14 March 2018 - M. van den Biggelaar
// Calculation logic and variables names related to "VAI-VAB Simulation v2.0 rates 2018.xls"

// comments: - do we need a check for duties > 0?



// --- Front

var estimation;
var a1;
var a2;
var a3;
var a4;
var precompte;
var status;
var results;
var errors;
  
// --- Calculation 

 	var minPc = 0.0050;
    var minAmt = 80;

    // Self-Employed
    var baseSelfEmp = 1.06;
    var baseMajSelfEmp = 0.90;
    var tauxMajSelfEmp = 0.0225;
    var VAI1SelfEmp = 0.030;
    var VAI2SelfEmp = 0.025;
    var VAI3SelfEmp = 0.020;
    var VAI4SelfEmp = 0.015;

    // Companies
    var baseCie = 1.03;
    var baseMajCie = 1;
    var tauxMajCie = 0.0675;
    var VAI1Cie = 0.09;
    var VAI2Cie = 0.075;
    var VAI3Cie = 0.060;
    var VAI4Cie = 0.045;


// COMPUTE RESULTS FOR SELF EMPLOYED
// Avantages des versements anticipÃ©s effectuÃ©s
function calculate(status, estimation, a1, a2, a3, a4, precompte) {
	estimation = estimation || 0;
	a1 = a1 || 0;
	a2 = a2 || 0;
	a3 = a3 || 0;
	a4 = a4 || 0;
	precompte = precompte || 0;
    // the declaration of resB14 need to be on top
    var resB14 = (function() {
        return (a1 * VAI1SelfEmp + a2 * VAI2SelfEmp + a3 * VAI3SelfEmp + a4 * VAI4SelfEmp).toFixed(2);
    }());

    // Majoration pour absence de versement anticipÃ©
    var resB13 = (function() {
        var condition1 = (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp;
        var condition2 = (minPc * (estimation * baseSelfEmp - precompte));

        if (condition1 < condition2) {
            return "0.00";
        } else {
            var condition3 = ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp) < minAmt;

            if (condition3) {
                return "0.00";
            } else {
                return ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp).toFixed(2);
            };
        };
       
    }());


    // Majoration pour insuffisance de versement anticipÃ©Âµ
    var resB15 = (function() {
        if ((a1 + a2 + a3 + a4) > 0) {
            return ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp).toFixed(2);
        } else {
            return "";
        }
    }());

    // Majoration Ã  payer
    var resB16 = (function() {
        if ((a1 + a2 + a3 + a4) > 0) {
            var condition1 = (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp < (minPc * (estimation * baseSelfEmp - precompte));
            if (condition1) {
                return "0.00";
            } else {
                var condition2 = (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp < minAmt;
                if (condition2) {
                    return "0.00";
                } else {
                    return ((((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) - resB14) * baseMajSelfEmp).toFixed(2);
                }
            };
        } else {
            return resB13;
        };
    }());

    // Montant optimal Ã  verser en T1
    var resB18 = (function() {
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

    // Montant idÃ©al de versement anticipÃ© en T1
    var resB22 = (function() {
        return resB18;
    }());

    // Vous Ã©vitez une majoration de
    var resB23 = (function() {
        return (((estimation * baseSelfEmp - precompte) * tauxMajSelfEmp) * baseMajSelfEmp).toFixed(2);
    }());

    // COMPUTE RESULTS FOR COMPANIES
    // Same label as for self Employed

    // the declaration of resC14 need to be on top
    var resC14 = (function() {
        return (a1 * VAI1Cie + a2 * VAI2Cie + a3 * VAI3Cie + a4 * VAI4Cie).toFixed(2);
    }());


    var resC13 = (function() {
		var condition1 =  ((((estimation * baseCie - precompte) * tauxMajCie) - resC14) * baseMajCie);
		var condition2 = (minPc * ( estimation * baseCie - precompte));
		if( condition1 < condition2) { 
			return "0.00";
		} else {
			var condition3 = (((estimation * baseCie - precompte) * tauxMajCie) - resC14) * baseMajCie; 
			if( condition3 < minAmt) { 
				return "0.00"
			} else { 
				return (((estimation * baseCie - precompte) * tauxMajCie) - resC14) * baseMajCie;
			};
		};
    }());
    var resC15 = (function() {
    	return ((estimation - precompte) * tauxMajCie) - resC14; 
    }());

    var resC16 = (function() {
        if (a1 + a2 + a3 + a4 > 0) {
            var condition1 = ((estimation - precompte) * tauxMajCie) - resC14 < (minPc * (estimation - precompte));
            if (condition1) {
                return "0.00";
            } else {
                var condition2 = ((estimation - precompte) * tauxMajCie) - resC14 < minAmt;
                if (condition2) {
                    return "0.00";
                } else {
                    return (((estimation - precompte) * tauxMajCie) - resC14).toFixed(2);
                }
            }
        } else {
            return resC13;
        }
    }());

    var resC18 = (function() {
        var condition1 = (estimation - precompte) * tauxMajCie < (minPc * (estimation - precompte));
        var condition2 = (((estimation - precompte) * tauxMajCie) < minAmt);

        if (condition1 || condition2) {
            return "0.00";
        } else {
            return (((estimation - precompte) * tauxMajCie) / VAI1Cie).toFixed(2)
        }
    }());

    var resC22 = (function() {
        return resC18;
    }());

    var resC23 = (function() {
        return ((estimation - precompte) * tauxMajCie).toFixed(2);
    }());

    return {
    	status: status,
        selfEmployed: {
            b13: resB13,
            b14: resB14,
            b15: resB15,
            b16: resB16,
            b18: resB18,
            b22: resB22,
            b23: resB23
        },
        companies: {
            c13: resC13,
            c14: resC14,
            c15: resC15,
            c16: resC16,
            c18: resC18,
            c22: resC22,
            c23: resC23
        },
    };

      // reset calculation
      if (document.querySelector('.result-block').style.display === "block") {
        var resetCalculation = document.querySelector('.reset_button');
        resetCalculation.addEventListener('click', alert('fff'));
      }
    
};

function resetForm() {
    setValuetoZero()
    hideErrors()
    hideResultBlock()
};

function setValuetoZero() {
    document.getElementById('profile_1').checked = true;
    document.getElementById('profile_1').checked = false;
    document.getElementById('estimatePayTax').value = 0;
    a1 = 0;
    a2 = 0;
    a3 = 0;
    a4 = 0;
    document.getElementById('duties').value = 0;
};

function hideErrors() {
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.error3').style.display = 'none';
    document.querySelector('.error2').style.display = 'none';
};

function hideResultBlock() {
    document.querySelector('.result-block').style.display = 'none';
};

// --------------------------------------------------------------------------
// --------------------------- FRONT END ------------------------------------
// --------------------------------------------------------------------------

    var resultBlock = document.querySelector('.result-block');
    resultBlock.style.display = 'none';		
    var statusErrorMessage = document.querySelector('.error');
    statusErrorMessage.style.display = 'none';
    var precompteErrorMessage = document.querySelector('.error3');
    precompteErrorMessage.style.display = 'none';
    
    document.getElementById('profile_1').checked = true;

    var form = document.querySelector('.form-calculate');
    form.addEventListener('submit', function submitForm(e){ 
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);

        estimation = Number(document.getElementById('estimatePayTax').value);
        var estimationErrorMessage = document.querySelector('.error2');
        if(estimation > 0) {
            estimationErrorMessage.style.display = 'none';
            document.querySelector('.result-block').style.display = "block";
            // Get Values
            if (document.getElementById('profile_1').checked) { 
                status = "selfEmployed";
            } else { 
                status = "companies"
            }
            a1 = Number(document.getElementById('needPay_1').value);
            a2 = Number(document.getElementById('needPay_2').value);
            a3 = Number(document.getElementById('needPay_3').value);
            a4 = Number(document.getElementById('needPay_4').value);
            precompte =  Number(document.getElementById('duties').value);

            results = calculate(status, estimation, a1, a2, a3, a4, precompte);
                // Show result div
                if (results.status === "selfEmployed") { 
                    document.getElementById('result_1').innerHTML = results.selfEmployed.b13;
                    document.getElementById('result_2').innerHTML = results.selfEmployed.b14;
                    document.getElementById('result_4').innerHTML = results.selfEmployed.b22;
                    document.getElementById('result_5').innerHTML = results.selfEmployed.b23;
                    // to write
                } else { 
                    // to write
                    document.getElementById('result_1').innerHTML = results.companies.c13;
                    document.getElementById('result_2').innerHTML = results.companies.c14;
                    document.getElementById('result_4').innerHTML = results.companies.c22;
                    document.getElementById('result_5').innerHTML = results.companies.c23;
                };

        }

        else {
            estimationErrorMessage.style.display = 'block';
        }
    
    });

       