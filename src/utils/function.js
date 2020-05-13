const formatPrice = function(price){
    const arr = price.toString().split('.')
    let num = parseInt(arr[1])
    if(isNaN(num) || num === 0){
        return arr[0]
    }
    return parseInt(arr[0]) + num / 100
}

function dateFormat(fmt,date){
    let ret;
    const opt ={
        "Y+":date.getFullYear().toString(),
        "m+":(date.getMonth() + 1).toString(),
        "d+":date.getDate().toString(),
        "H+":date.getHours().toString(),
        "M+":date.getMinutes().toString(),
        "S+":date.getSeconds().toString()
    };
    for(let k in opt){
        ret = new RegExp("("+ k + ")").exec(fmt);
        if(ret){
            fmt = fmt.replace(ret[1],(ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length,"0")))
        };
    };
    return fmt;
}

export{
    formatPrice,
    dateFormat
}