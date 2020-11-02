function handlePlans(val,data) {
    switch (val) {
      case "one":
          handleTap(1,0.4667,6000,data)
        break;

        case "two":
          handleTap(2,0.48,10000,data)
            break;
            case "four":
          handleTap(4,0.512,25000,data)
            break;
            case "six":
          handleTap(6,0.568,50000,data)
            break;
            case "eight":
          handleTap(8,0.6507,75000,data)
            break;
            case "twelve":
          handleTap(12,0.816,100000 ,data)
            break;
          
      default:
        break;
    }
  }

  function handleTap(month,percent,capital,data){
        var num = month;
            var day = 3
            for (let index = 0; index < num; index++) {
              var main = document.getElementById("main");
                var wrap = document.createElement("div");
                var heading = document.createElement('p')
                heading.classList.add('h5','myheading')
                wrap.appendChild(heading)
                if (index  > getMonthDiff(data) ) {
                 wrap.classList.add('hide') 
                }
              for (let j = 0; j < day; j++) {
               
              var div1 = document.createElement("div");
              var div2 = document.createElement("div");
              var p = document.createElement("p");
             
              div1.classList.add("text-center", "mybal", "shadow-sm");
              div2.classList.add("h5", "font-weight-bold");
    
              
              p.classList.add("font-weight-bold", "text-gray-500");
              if(j== 0){
                p.innerText = `Day 0`
                div2.innerText = `R${number_format(Math.round((Math.round(capital*percent) * (j/2))/num))}.00`
              }
              if(j==1){
                p.innerText = `Day 15`
                if (getTimeDiff(data) >= 15) {
                  div2.innerText = `R${number_format(Math.round((Math.round(capital*percent) * (j/2))/num))}.00`
                }else{
                  div2.innerText = 'PENDING'
                }
                
              }
              if(j==2){
                p.innerText = `Day 30`
                if (getTimeDiff(data) >= 30) {
                  div2.innerText = `R${number_format(Math.round((Math.round(capital*percent) * (j/2))/num))}.00`
                }else{
                  div2.innerText = 'PENDING'
                }
              }
             

            
              wrap.classList.add('d-flex','justify-content-between','align-items-center')
              heading.innerText = `Month ${index + 1}`
              
              div1.appendChild(p);
              div1.appendChild(div2);
              wrap.appendChild(div1)
              }
            
             ;
             
              main.appendChild(wrap)
             
            }
  }

  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + "").replace(",", "").replace(" ", "");
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return "" + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }

  function getTimeDiff(date){
    var date1 = new Date(date); 
    var date2 = new Date(); 
      
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
      
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
  
   
    return Math.round(Difference_In_Days)
      
  }

  function getMonthDiff(date){
    var diff =(new Date().getTime() - new Date(date).getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
   return Math.abs(Math.round(diff));
   
  }
